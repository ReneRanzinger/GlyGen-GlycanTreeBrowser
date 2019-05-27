
    var nodeArray = new Array();
    var bondArray = new Array();
    var textArray = new Array();
    var DisplayMessage = new Array();
    var toggler = document.getElementsByClassName("caret");
    var i;

    var string="";
    var flag=1;
    var flag1=0;
    var flag2=1;
    var flag3=1;
    var html_doc;
    var html_doc_nodes;
    var previous;
    var previous1;
    var color_array=new Array();
    var grey_scale=new Array();
    var node_index=new Array();
    var sNode1=new Array();
    
    var sBond=new Array();

    window.onload=function() {
          var svgObj = document.getElementById("mySVG");
          var svgDoc = svgObj.contentDocument;
          var sNode = svgDoc.getElementsByClassName("sugar");
          var sBond = svgDoc.getElementsByClassName("bond");
           var sText = svgDoc.getElementsByClassName("sText");
          var nis;
          // var theDiv=$("#infoDiv");
          // var nodeDiv=$("#Nodes");
          var grey_scale=new Array(sNode.length);
          var color_array=new Array(sNode.length);
          var bondArray=new Array(sNode.length);
          var textArray=new Array(sNode.length);

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

          
          var sBond = svgDoc.getElementsByClassName("bond");
            for (var i = 0; i < sBond.length; i++) {
            var nis = sBond[i].getAttribute("bondIndex");
            bondArray[nis] = sBond[i];
            }

             var sText = svgDoc.getElementsByClassName("sText");
            for (var i = 0; i < sText.length; i++) {
            var nis = sText[i].getAttribute("textIndex");
            textArray[nis] = sText[i];
            }
          for(i=0;i<sNode.length;i++){
            
            var nis=sNode[i].getAttribute("nodeIndex");
            color_array[nis]=sNode[i].getAttribute("fill");
            console.log("The color[i] is "+ color_array[i]);
          }
          for(i=0;i<sNode.length;i++){
            var nis3=sNode[i].getAttribute("nodeIndex");
            sNode1[nis3] = sNode[i];
            console.log("The color[i] is "+ color_array[i]);
          }
          // for(i=0;i<sNode.length;i++){
          //   var nis3=sNode[i].getAttribute("nodeIndex");
          //   node_index[i] = ni;
          //   console.log("The color[i] is "+ color_array[i]);
          // }
          


          $ajaxUtils.sendGetRequest("data/GOG123.json", function (res) {
            let enzymeMap = new Map();
            console.log(enzymeMap);
                  for(var i=0; i<res.residues.length;i++) { 
                 if(res.residues[i].enzymes.length != 0) {
                    for(var j=0; j<res.residues[i].enzymes.length; j++) {
                        if(enzymeMap.has(res.residues[i].enzymes[j].accession)) {
                            console.log(enzymeMap.get(res.residues[i].enzymes[j].accession));
                            enzymeMap.get(res.residues[i].enzymes[j].accession).push(res.residues[i].index);
                            var accList = enzymeMap.get(res.residues[i].enzymes[j].accession);
                            console.log(accList);
                        } 
                        else {
                            enzymeMap.set(res.residues[i].enzymes[j].accession, [res.residues[i].index]);
                        }
                    }
                } // 
            }// END OF RESIDUES LOOPING
            console.log("The enyzme Map is as follows: "+enzymeMap);
            
                  for (var [key, value] of enzymeMap) {
                              console.log(key + ' = ' + value);
                    }

            for(var j=0;j<sNode.length;j++){
             var hex=sNode[j].getAttribute("fill");
             var nis1 = sNode[j].getAttribute("nodeIndex");
              var c=pSBC ( 0.70, hex);
              grey_scale[nis1]=c;

            
          }
        
            for (var i = 0; i < sNode.length; i++) {
                var nis = sNode[i].getAttribute("nodeIndex");
                //console.log(" This snode object"+i+ " The snode object is"+sNode[i]);
                //console.log(" This is nis"+nis);
                nodeArray[nis] = sNode[i];
                //console.log(" This is the Node array"+ nodeArray[nis]);
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
                      document.getElementById("infoDiv2")
                                        .innerHTML = "" + enzyme_message + "";

                      var welcome_message= "<center>" + " <h5>" + " RESIDUE PROPERTIES" + " <h5>" + "</center>";
                      message = " Name : " + res.residues[ni].name  + "<br>" + " Anomeric configuration : " + res.residues[ni].anomer + "<br>" + " Absolute configuration :  " +  res.residues[ni].absolute + "<br>" + " Ring  configuration : " +  res.residues[ni].ring  +"<br>" + result;
                    }
                    document.getElementById("infoDiv1")
                                        .innerHTML = "" + message + "";
                });// ENDING OF SNODE LISTENER
                
            }// ENDING OF SNODE LOOP
            

           /*var html_doc1 = "<div id = \" Enzymes\" class=\"tabcontent\" >" + "<Button id = \"Enzyme_id\"> "+ " Enzyme Button</Button> " + "</div>";
           html_doc1 = "<button class=\"tablinks\" onclick=\"openCity(event, 'Enzymes')\" id=\"defaultOpen\">Enzyme</button>"
                var jqHtmlPart = $(html_doc1);
                var jqObjB11 = jqHtmlPart.find("#defaultOpen");
                jqObjB11.click(function(){
                  var i, tabcontent, tablinks;
                  tabcontent = document.getElementsByClassName("tabcontent");
                  for (i = 0; i < tabcontent.length; i++) {
                    tabcontent[i].style.display = "none";
                  }
                  tablinks = document.getElementsByClassName("tablinks");
                  for (i = 0; i < tablinks.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" active", "");
                  }
                  document.getElementById(cityName).style.display = "block";
                  evt.currentTarget.className += " active";
                })
                theDiv.append(jqHtmlPart);*/
              var root1 = $('#ul_tea');
              enzymeMap.forEach(function(v, k){
              console.log(k + ' = ' + v);
              if(flag1!=enzymeMap.size){
                html_doc="<li><Button id ='b1" + k +"'> Enzymes is : "+ k  + "</Button></li>";
                var jqHtmlPart = $(html_doc);
                var jqObjB1 = jqHtmlPart.find("#"+"b1"+k);
                console.log("This is jqObj1"+jqObjB1);
                console.log(" The value of flag1 is :"+flag1);
                flag1++;
             }                    
          jqObjB1.on('click',function(e){
                  console.log("This issss saataaammmm 1 :"+bondArray[1]);
                  console.log("I am insiaw jqObjq");
                  if(flag2==0){
                    previous.css("color", "black" );
                  }
                  previous=$( this );
                  console.log("this is previous1"+previous);
                  previous.css( "color", "red" );
                  flag2=0;
                  console.log("The v is :"+v);

                  for (var i = 1; i < 14; i++) {
                                bondArray[i].setAttribute("stroke", "#DCDCDC");
                                //textArray[i].setAttribute("style", "stroke: #696969");
                                textArray[i].setAttribute("stroke","#DCDCDC");

                                //console.log("The bond array is :"+bondArray[i]);

                              }
                  for(var i=0; i<sNode.length;i++) {  
                            //var temp2=e.target.id;
                            //console.log("The value of temp2 is :"+temp2);
                            var temp1=sNode[i].getAttribute("nodeIndex");
                            // var  bbox=nodeArray[temp1].getBBox();
                            // nodeArray[temp1].setAttribute('transform', 'translate('+translatestr+') scale('+saclestr+')', 'transition:.3s;');
                            sNode[i].style.fill=grey_scale[temp1];

                          }
            //console.log("The bondarray is :"+bondArray[1]);
                  
                  for(var j = 0; j< v.length; j++) {
                      var temp_node=v[j];
                      var idx;
                      for (var i = 0; i < sNode.length; i++) {
                        if(sNode[i].getAttribute("nodeIndex") == temp_node) {
                          idx = i;
                          break;
                        }
                      }
                      //var idx = sNode[temp_node].getAttribute("nodeIndex");
                     // nodeArray[temp_node].setAttribute('transform', 'translate('+translatestr+') scale('+saclestr+')', 'transition:.3s;');
                      //flag=0;
                      sNode[idx].style.fill=color_array[temp_node];
                      //sNode[idx].style.fill=color_array[temp_node];
                      sNode[idx].setAttribute("stroke",'black');
                      console.log("the temp_node is QWERTY :"+temp_node);
                      // console.log("")
                  }// END OF LTH LOOP
          //  } // END OF RETURN FUNCTION


                });// END OF ONCLICK FUNCTION
              //}
            root1.append(jqHtmlPart);
            });//}// END OF ENZYME MAP VALUE



              //console.log("The value of reside length :"+ res.residue.length);
              var root = $('#ul_bev');
              for(var j=0;j<res.residues.length;j++){
                              
                
               // html_doc_nodes = "<div id = \" nested \">" + "<Button id = \""+ res.residues[j].index+"b1\"> "+ "Node Index: "+res.residues[j].index + "</Button> " + "</div>";
               html_doc_nodes = "<li><Button id ='b1" + res.residues[j].index+"'> Node Index: "+res.residues[j].index + "</Button></li>";

               var jqHtmlPart_nodes = $(html_doc_nodes);

               var jqObjB1_nodes = jqHtmlPart_nodes.find("#b1" + res.residues[j].index);
               
               jqObjB1_nodes.on('click', function(e){                  
                  
                  var b1Id = e.target.id;// res.residues[j].index+"b1";
                  var k = b1Id.substr(2);
                  console.log("The value is ghyyyyyy :"+k);
                    //return function(){
                      
                      if(flag3==0){
                        
                        previous1.css("color","black");
                        console.log("this is previous1"+previous1);
                      } 
                      flag3=0;
                      $(this).css( "color", "blue" );
                       previous1=$( this );
                        console.log("Theeeeeeee saataamm"+bondArray[1]);
                       for (var i = 1; i < 14; i++) {
                                bondArray[i].setAttribute("stroke", "#DCDCDC");
                                //textArray[i].setAttribute("style", "stroke: #696969");
                                textArray[i].setAttribute("stroke","#DCDCDC");
                                //sNode[idx].setAttribute("stroke","#DCDCDC");

                                //console.log("The bond array is :"+bondArray[i]);

                              }
                              for (var i = 0; i < sNode.length; i++) {
                                // bondArray[i].setAttribute("stroke", "#DCDCDC");
                                // //textArray[i].setAttribute("style", "stroke: #696969");
                                // textArray[i].setAttribute("stroke","#DCDCDC");
                                sNode[i].setAttribute("stroke","#DCDCDC");

                                //console.log("The bond array is :"+bondArray[i]);

                              }
                       for(var i=0; i<sNode.length;i++) {  
                            //var temp2=e.target.id;
                            //console.log("The value of temp2 is :"+temp2);
                            var temp1=sNode[i].getAttribute("nodeIndex");
                            sNode[i].setAttribute("stroke","#DCDCDC");
                            sNode[i].style.fill=grey_scale[temp1];

                          }

                      //sNode[k].style.fill=color_array[k];
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
                      console.log("The length of bondarray is :"+bondArray.length);
                     
                      //var idx = sNode[temp_node].getAttribute("nodeIndex");
                     // nodeArray[temp_node].setAttribute('transform', 'translate('+translatestr+') scale('+saclestr+')', 'transition:.3s;');
                      //flag=0;
                      
                      
                        


                     //};

               });
               root.append(jqHtmlPart_nodes);

        //        jqObjB1_nodes.mouseleave((function(){
        //             var d=j;
        //             var b1Id = res.residues[j].index+"b1";

        //             return function(){
        //                 //alert("You clicked "+ b1Id); 
                          
        //                 console.log(" This is nodeArray 0" +nodeArray[d]);
        //                 bbox=nodeArray[d].getBBox();
        //                 var cx=bbox.x-(bbox.width/2),
        //                 cy=bbox.y-(bbox.height/2);   // finding center of element
        //                 var scalex=1, scaley=1;    // your desired scale
        //                 var saclestr=scalex+','+scaley;
        //                 var tx=cx*(scalex-1);
        //                 var ty=cy*(scaley-1);                        
        //                 var translatestr=tx+','+ty;
        // // modify this method to do something when the mouse is moved out of the node associated with nid
        
        //               nodeArray[d].setAttribute('transform','translate('+translatestr+') scale('+saclestr+')', 'transition:.3s;');
        //             };

        //        })());

               // nodeDiv.append(jqHtmlPart_nodes);
             }


    }); // END OF AJAX CALL
    var toggler = $(".caret");
    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
      });
    }
//document.getElementById("defaultOpen").click();
}// END OF WINDOW.ONLOAD()
// function openTab(evt, cityName) {
//   var i, tabcontent, tablinks;
//   tabcontent = document.getElementsByClassName("tabcontent");
//   for (i = 0; i < tabcontent.length; i++) {
//     tabcontent[i].style.display = "none";
//   }
//   tablinks = document.getElementsByClassName("tablinks");
//   for (i = 0; i < tablinks.length; i++) {
//     tablinks[i].className = tablinks[i].className.replace(" active", "");
//   }
//   document.getElementById(cityName).style.display = "block";
//   evt.currentTarget.className += " active";
// }


// Get the element with id="defaultOpen" and click on it
           

/*            enzymeMap.forEach(function(v, k){
              console.log(k + ' = ' + v);
              if(flag1!=enzymeMap.size){
                html_doc = "<div id = \" Enzymes\" class=\"tabcontent\" >" + "<Button id = \""+ k +"b1\"> "+ " Enzyme is : "+ k + "</Button> " + "</div>";
                var jqHtmlPart = $(html_doc);
                var jqObjB1 = jqHtmlPart.find("#"+k+"b1");
                console.log("This is jqObj1"+jqObjB1);
                console.log(" The value of flag1 is :"+flag1);
                flag1++;
             }                    
             if(jqObjB1 != null){ 
               jqObjB1.click(function(){
                  if(flag==0){
                         for(var i=0; i<res.residues.length;i++) {  


                            var temp1=res.residues[i].index;
                            var  bbox=nodeArray[temp1].getBBox();
                            var cx=bbox.x+(bbox.width/2);
                            var cy=bbox.y+(bbox.height/2);   // finding center of element
                            var scalex=1, scaley=1;    // your desired scale
                            var saclestr=scalex+','+scaley;
                            var tx=-cx*(scalex-1);
                            var ty=-cy*(scaley-1);                        
                            var translatestr=tx+','+ty;
                            nodeArray[temp1].setAttribute('transform', 'translate('+translatestr+') scale('+saclestr+')', 'transition:.3s;');

                          }
                    
                  }
            
                  for(var j = 0; j< v.length; j++) {
                      var temp_node=v[j];
                      console.log("The value 0 is :"+ v[j]);
                      console.log("this is temp_node"+temp_node);
                      var  bbox=nodeArray[temp_node].getBBox();
                      var cx=bbox.x+(bbox.width/2);
                      var cy=bbox.y+(bbox.height/2);   // finding center of element
                      var scalex=1.5, scaley=1.5;    // your desired scale
                      var saclestr=scalex+','+scaley;
                      var tx=-cx*(scalex-1);
                      var ty=-cy*(scaley-1);                        
                      var translatestr=tx+','+ty;
                      nodeArray[temp_node].setAttribute('transform', 'translate('+translatestr+') scale('+saclestr+')', 'transition:.3s;');
                      flag=0;
                  }// END OF LTH LOOP
          //  } // END OF RETURN FUNCTION


                });// END OF ONCLICK FUNCTION
              }
              theDiv.append(jqHtmlPart);
            });//}// END OF ENZYME MAP VALUE*/
          
          
       // document.getElementById("defaultOpen").click();
/*});*/

/*         */
      
                        
                         
                         
                    




                

              











