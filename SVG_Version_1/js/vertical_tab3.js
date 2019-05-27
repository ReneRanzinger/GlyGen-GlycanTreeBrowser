
    var nodeArray = new Array();
    var bondArray = new Array();
    var textArray = new Array();
    var DisplayMessage = new Array();
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
    window.onload=function() {
          var svgObj = document.getElementById("mySVG");
          var svgDoc = svgObj.contentDocument;
          var sNode = svgDoc.getElementsByClassName("sugar");
          var nis;
          var theDiv=$("#infoDiv");
          var nodeDiv=$("#Nodes");
          
         
          for(i=0;i<sNode.length;i++){
            color_array[i]=sNode[i].getAttribute("fill");
            console.log("The color[i] is "+ color_array[i]);
          }
          for(var j=0;j<sNode.length;j++){
            var hex=sNode[j].getAttribute("fill");
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
             var final= result ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16)
              } : null;
//console.log("The rgb value"+r+g+b);
//alert( hexToRgb("#0033ff").g );

              var re,bl,gr;
              re=final.g;
              bl=final.r;
              gr=final.b;
              var lum = Math.sqrt(re * re * 0.2126 + gr * gr * 0.7152 +  bl* 0.0722);

              var lum1=parseInt(lum);
              var lum1=lum1.toString(16);
              //X = (0.58 x R) + (0.17 x G) + (0.8 x B)
              //avg=(((re+bl+gr)/3) & 0xff);
              var hex_color="#"+lum1+lum1+lum1;
              console.log("The value of hex color is"+hex_color+"of the jth value:"+j);
              grey_scale[j]=hex_color;
              console.log("the grey scale value at j is :"+j+"The value is :"+grey_scale[j]);
            
          }


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
            console.log("The enyzme Map is : "+enzymeMap);
            console.log(" The enzyme map length is " + enzymeMap.size);

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

              enzymeMap.forEach(function(v, k){
              console.log(k + ' = ' + v);
              if(flag1!=enzymeMap.size){
                html_doc = "<div id = \" Enzymes\">" + "<Button id = \""+ k +"b1\"> "+ " Enzyme is : "+ k + "</Button> " + "</div>";
                var jqHtmlPart = $(html_doc);
                var jqObjB1 = jqHtmlPart.find("#"+k+"b1");
                console.log("This is jqObj1"+jqObjB1);
                console.log(" The value of flag1 is :"+flag1);
                flag1++;
             }                    
             if(jqObjB1 != null){ 
              

               jqObjB1.click(function(){

                  if(flag2==0){
                    previous.css("color", "black" );
                  }

                     previous=$( this );
                     console.log("this is previous1"+previous);
                    previous.css( "color", "red" );
                    flag2=0;

                console.log("The color[111111111111111] is "+ color_array[1]);
                
                  if(flag==0){
                         for(var i=0; i<res.residues.length;i++) {  


                            var temp1=res.residues[i].index;
                            console.log("The temp1 value here is :"+temp1);
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
            });//}// END OF ENZYME MAP VALUE



              //console.log("The value of reside length :"+ res.residue.length);
              for(var j=0;j<res.residues.length;j++){
                               console.log(" I REACHEDDDDDDDDDDDDDDDD You reached jth value of : "+j);
                               
                               //nodeArray[j] = sNode[j];
                               console.log(" This is the NodeArray :"+nodeArray)


              // var html_doc = "<div>" + "<Button id = obj1>" + residue[0].index + "</Button> " + "</div>";
               html_doc_nodes = "<div id = ''>" + "<Button id = \""+ res.residues[j].index+"b1\"> "+ "Node Index: "+res.residues[j].index + "</Button> " + "</div>";
                
               var jqHtmlPart_nodes = $(html_doc_nodes);

               var jqObjB1_nodes = jqHtmlPart_nodes.find("#" + res.residues[j].index + "b1");
               
               jqObjB1_nodes.click((function(){
                    
                  //   if(flag3==0){
                  //   previous1.css("color", "black" );
                  // }

                   
                  var k=j;
                    var b1Id = res.residues[j].index+"b1";
                  //   flag3=0;
                  // previous1=$(this);
                  // this.css("color","red");

                   return function(){
                       
                      if(flag3==0){
                        
                        previous1.css("color","black");
                        console.log("this is previous1"+previous1);

                      } 
                      flag3=0;
                      $(this).css( "color", "blue" );
                       previous1=$( this );
                       
                      


        //                  var  bbox=nodeArray[k].getBBox();
        //                  var cx=bbox.x+(bbox.width/2),
        //                  cy=bbox.y+(bbox.height/2);   // finding center of element
        //                  var scalex=1.5, scaley=1.5;    // your desired scale
        //                  var saclestr=scalex+','+scaley;
        //                  var tx=-cx*(scalex-1);
        //                  var ty=-cy*(scaley-1);                        
        //                  var translatestr=tx+','+ty;

        
       
        // // modify this method to do something when node associated with nid is clicked


        // nodeArray[k].setAttribute('transform', 'translate('+translatestr+') scale('+saclestr+')', 'transition:.3s;');
                      sNode[k].style.fill=color_array[k];
                        for(var d=0; d<sNode.length; d++){
                                  if(k!=d){
                                    sNode[d].style.fill='grey';
                                    //sNode[d].style.fill=grey_scale[d];
                                  }
                                }

                    };

               })());

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

               nodeDiv.append(jqHtmlPart_nodes);
             }


    }); // END OF AJAX CALL
document.getElementById("defaultOpen").click();
}// END OF WINDOW.ONLOAD()
function openTab(evt, cityName) {
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
}

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
      
                        
                         
                         
                    




                

              











