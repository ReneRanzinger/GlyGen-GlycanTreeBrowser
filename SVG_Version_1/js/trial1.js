function json2svg(){
			   
    
    
    var i;

    var string="";
    var flag=1;// Flag for approaching the first element of the nodes
    var flag1=0;// Flag for approaching the first element of the enzymes
    var flag2=1;
    var flag3=1;
    var html_doc;
    var html_doc_nodes;
    var previous;
    var previous1;
    var node_index=new Array();
    var sNode1=new Array();
    var sBond=new Array();


// Extracting the svg and the features from the svg
          var svgObj = document.getElementById("mySVG");
          var svgDoc = svgObj.contentDocument;
          var sNode = svgDoc.getElementsByClassName("sugar");
          var sBond = svgDoc.getElementsByClassName("bond");
           var sText = svgDoc.getElementsByClassName("sText");
          var nis;

          var nodeArray = new Array(); // Storing the features like fill,stroke etc of each node
          var grey_scale=new Array(sNode.length);// Storing all the grey scaled colors of each node
          var color_array=new Array(sNode.length);// Storing original colors of the nodes
          var bondArray=new Array(sNode.length);// Storing the bond corresponding to the nodes
          var textArray=new Array(sNode.length);// Storing the text of each bond
          
// Function to lighten the original color of the node
          const pSBC=(p,c0,c1,l)=>{
                      let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
                      if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
                      if(!this.pSBCr)this.pSBCr=(d)=>{
                          let n=d.length,x={};
                          if(n>9){
                              [r,g,b,a]=d=d.split(","),n=d.length;
                              if(n<3||n>4)return null;
                              x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
                          }else{
                              if(n==8||n==6||n<4)return null;
                              if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
                              d=i(d.slice(1),16);
                              if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
                              else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
                          }return x};
                      h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=pSBCr(c0),P=p<0,t=c1&&c1!="c"?pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
                      if(!f||!t)return null;
                      if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
                      else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
                      a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
                      if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
                      else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
        }

        // Storing all the bondindex of the node at the particular nodeindex  
          var sBond = svgDoc.getElementsByClassName("bond");
            for (var i = 0; i < sBond.length; i++) {
            var nis = sBond[i].getAttribute("bondIndex");
            bondArray[nis] = sBond[i];
            }

          // Storing all the textindex of the node at the particular nodeindex    
             var sText = svgDoc.getElementsByClassName("sText");
            for (var i = 0; i < sText.length; i++) {
            var nis = sText[i].getAttribute("textIndex");
            textArray[nis] = sText[i];
            }


        // Storing all the original colors of the nodes
          for(i=0;i<sNode.length;i++){
            
            var nis=sNode[i].getAttribute("nodeIndex");
            color_array[nis]=sNode[i].getAttribute("fill");
            //console.log("The color[i] is "+ color_array[i]);
          }
          


// Making a AJAX CALL to the JSON FILE 
          $ajaxUtils.sendGetRequest("data/GOG123.json", function (res) {

       // CREATING ENZYME MAP FOR THE ENZYMES CORRESPONDING THE NODES
            let enzymeMap = new Map();
            //console.log(enzymeMap);
                  for(var i=0; i<res.residues.length;i++) { 
                 if(res.residues[i].enzymes.length != 0) {
                    for(var j=0; j<res.residues[i].enzymes.length; j++) {
                        if(enzymeMap.has(res.residues[i].enzymes[j].accession)) {
                            //console.log(enzymeMap.get(res.residues[i].enzymes[j].accession));
                            enzymeMap.get(res.residues[i].enzymes[j].accession).push(res.residues[i].index);
                            var accList = enzymeMap.get(res.residues[i].enzymes[j].accession);
                            //console.log(accList);
                        } 
                        else {
                            enzymeMap.set(res.residues[i].enzymes[j].accession, [res.residues[i].index]);
                        }
                    }
                } // 
            }// END OF RESIDUES LOOPING


// Forming the array with the lighten shade of each node color
            for(var j=0;j<sNode.length;j++){
             var hex=sNode[j].getAttribute("fill");
             var nis1 = sNode[j].getAttribute("nodeIndex");
              var c=pSBC ( 0.70, hex);
              grey_scale[nis1]=c;

            
          }
        

        // displaying the properties from the json file upon hovering on the nodes
            for (var i = 0; i < sNode.length; i++) {
                var nis = sNode[i].getAttribute("nodeIndex");
                nodeArray[nis] = sNode[i];
                sNode[i].addEventListener("mouseover", function () {
                    var ni = this.getAttribute("nodeIndex");

                    if (res.residues[ni].index==ni) {
                        var enzyme_message=" Enzymes :";
                        var str = "Pubchem Record";
                        var result = str.link("https://pubchem.ncbi.nlm.nih.gov/compound/"+res.residues[ni].name);
                            if(res.residues[ni].enzymes==""){
                          var enzyme_message=" No enzymes contained in this molecule";
                            }
                            else{
                              for(var k=0; k<res.residues[ni].enzymes.length; k++){
                                enzyme_message= enzyme_message + res.residues[ni].enzymes[k].accession + "   ";
                              }
                      }
                      var welcome_message= "<center>" + " <h5>" + " ENZYMES" + " <h5>" + "</center>";
                      document.getElementById("infoDiv2").innerHTML = "" + enzyme_message + "";
                      var welcome_message= "<center>" + " <h5>" + " RESIDUE PROPERTIES" + " <h5>" + "</center>";
                      message = " Name : " + res.residues[ni].name  + "<br>" + " Anomeric configuration : " + res.residues[ni].anomer + "<br>" + " Absolute configuration :  " +  res.residues[ni].absolute + "<br>" + " Ring  configuration : " +  res.residues[ni].ring  +"<br>" + result;
                    }
                    document.getElementById("infoDiv1").innerHTML = "" + message + "";
                });// ENDING OF SNODE LISTENER
                
            }// ENDING OF SNODE LOOP


            // Creating buttons for the nodes
              var root1 = $('#ul_tea');
              enzymeMap.forEach(function(v, k){
                  if(flag1!=enzymeMap.size){
                    html_doc="<li><Button id ='b1" + k +"'> Enzymes is : "+ k  + "</Button></li>";
                    var jqHtmlPart = $(html_doc);
                    var jqObjB1 = jqHtmlPart.find("#"+"b1"+k);
                    flag1++;
                 } 

              // Adding the onclick listeners which lightens the colors of the other nodes and hovers the selected element
              jqObjB1.on('click',function(e){
                      if(flag2==0){
                        previous.css("color", "black" );
                      }
                  previous=$( this );
                  previous.css( "color", "red" );
                  flag2=0;

                  for (var i = 1; i < 14; i++) {
                                bondArray[i].setAttribute("stroke", "#DCDCDC");
                                textArray[i].setAttribute("stroke","#DCDCDC");
                  }
                  for(var i=0; i<sNode.length;i++) {  
                            var temp1=sNode[i].getAttribute("nodeIndex");
                            sNode[i].style.fill=grey_scale[temp1];
                  }
                  
                  for(var j = 0; j< v.length; j++) {
                      var temp_node=v[j];
                      var idx;
                      for (var i = 0; i < sNode.length; i++) {
                        if(sNode[i].getAttribute("nodeIndex") == temp_node) {
                          idx = i;
                          break;
                        }
                      }
                      
                      sNode[idx].style.fill=color_array[temp_node];
                      sNode[idx].setAttribute("stroke",'black');    
                  }// END OF LTH LOOP
              });// END OF ONCLICK FUNCTION
                   root1.append(jqHtmlPart);
            });//}// END OF ENZYME MAP VALUE


              // Creating the buttons for enzymes
              var root = $('#ul_bev');
              for(var j=0;j<res.residues.length;j++){
                   html_doc_nodes = "<li><Button id ='b1" + res.residues[j].index+"'> Node Index: "+res.residues[j].index + "</Button></li>";
                   var jqHtmlPart_nodes = $(html_doc_nodes);
                   var jqObjB1_nodes = jqHtmlPart_nodes.find("#b1" + res.residues[j].index);
               
              // Adding event listeners for the enzyme buttons which on clicking the enzymes button would highlight the corresponding nodes having that enzymes
               jqObjB1_nodes.on('click', function(e){                  
                  var b1Id = e.target.id; // res.residues[j].index+"b1";
                  var k = b1Id.substr(2);
                  
                    
                      if(flag3==0){
                        previous1.css("color","black");
                      } 
                      flag3=0;
                      
                      $(this).css( "color", "blue" );
                       previous1=$( this );
                       
                       for (var i = 1; i < 14; i++) {
                                bondArray[i].setAttribute("stroke", "#DCDCDC");
                                textArray[i].setAttribute("stroke","#DCDCDC");
                              }
                              for (var i = 0; i < sNode.length; i++) {
                                sNode[i].setAttribute("stroke","#DCDCDC");
}
                       for(var i=0; i<sNode.length;i++) {  
                            var temp1=sNode[i].getAttribute("nodeIndex");
                            sNode[i].style.fill=grey_scale[temp1];

                          }

                      var idx;
                      for(var i=0;i<sNode.length;i++){
                            if(sNode[i].getAttribute("nodeIndex") == k) {
                          idx = i;
                          //
                          break;
                        }
                      
                      }
                      sNode[idx].style.fill=color_array[k];
                      sNode[idx].setAttribute("stroke",'black');
                     

               });
               root.append(jqHtmlPart_nodes);
             }


    }); // END OF AJAX CALL

//
    //var toggler = document.getElementsByClassName("caret");// Getting the elements for the hireachical structures
    var toggler = $(".caret");
    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
      });
    }

}