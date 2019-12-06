function json2svg(parentWidth,parentHeight,leftSide,rightSide,mainPage){
 
    function divMaker(){
        // Dynamically making DIV's when the main Div id is passed
    $('#mainPage').append($("<div id='container'></div>"));
    // $('#mainPage').append($("<Button id='zoom_in'>   Zoom in </Button>")); 
    // $('#mainPage').append($("<Button id='zoom_out'>  Zoom out </Button>")); 
    $('#container').append($("<object id='mySVG' type='image/svg+xml' data='svg/G67612NO.svg'> </object>"));
    $(" <ul id='myUL' >  <li><span class= 'caret' >Nodes</span> <ul id='ul_bev' class='nested' ></ul> </li><li><span class='caret'>Enzymes</span>  <ul id='ul_tea' class='nested' ></ul></li></ul> ").appendTo("body");
    $("<div id='infoDiv1'> <center> RESIDUE PROPERTIES WILL BE DISPLAYED HERE </center></div><div id='infoDiv2'> <center>ENZYMES</center></div> </div>").appendTo("body");
   // $("<Button id='gtb_medium_svg'>Medium Size SVG </Button>").appendTo("body");
    //$("<Button id='gtb_small_svg'>Small Size SVG </Button>").appendTo("body");
    ($("<Button id='zoom_in'>   - </Button>")).appendTo("body");
    ($("<Button id='zoom_out'>  + </Button>")).appendTo("body");
    //($("<Button id='reset'>   RESET </Button>")).appendTo("body");
     ($("<Button id='reset'>  Reset </Button>")).appendTo("body");
    
    
    }
    divMaker();
    init();
    mainFunc();
    
    // INIT FUNCTION 
    //1st para: id of the parent div
    //2nd para: heigth of the parent div
    //3rd par: width
    //4th para : width of the leftside panel
    //5th para: width of the rightside panel
    //intizialeviewer("#mainDiv",600,800,100,100,"svgFile");
    function init(){
        $(function (){
      
            var svgWidth=(parseFloat(parentWidth).toFixed(2))-(parseFloat(leftSide).toFixed(2))-(parseFloat(rightSide).toFixed(2));
            $("#mainPage").css("width",parentWidth);
            $("#mainPage").css("height",parentHeight);
            
            $("#myUL").css("width",leftSide); // Column No1 of the Menu Options
            $("#myUL").css("height",parentHeight);
            
            var svg1=+(parseFloat(leftSide).toFixed(2)) - +8;
            $("#container").css("margin-left",svg1); // (8 px to be reduced more error)
            $("#container").css("width",svgWidth);
            $("#container").css("height",parentHeight);
            
            var info1= +(parseFloat(leftSide).toFixed(2)) - +(parseFloat(1).toFixed(2)) + +(parseFloat(svgWidth).toFixed(2));
            $("#infoDiv1").css("margin-left",info1); // 4 px to be reduced
            $("#infoDiv2").css("margin-left",info1);
            $("#infoDiv1").css("width",rightSide); 
            $("#infoDiv2").css("width",rightSide); 
            $("#infoDiv1").css("height",(parentHeight/2)); // Column No3 upper-div
            var topLength= +(parseFloat(parentHeight/2).toFixed(2))  +  +(parseFloat(70).toFixed(2));
            
            $("#infoDiv2").css("top",topLength);
            $("#infoDiv2").css("height",(parentHeight/2)); // Column No3 lower-div
    
            // $("zoom_in").css("top","0px");
            // $("zoom_in").css("margin-left",svg1);
            // $("zoom_out").css("margin-left",svg1);
            // $("zoom_in").css("width","60 px");
            // $("zoom_out").css("width","60 px");
      
      });
    
    }
    
    function deleteData(){
        $("#ul_bev").empty();
        $("#ul_tea").empty();
        // $("#infoDiv1").empty();
        // $("#infoDiv2").empty();
    }
    
    var count=1;
    $('#zoom_in').on('click', function() {

        var val=count-0.1;
        count=val;
        console.log("the height of svg is :"+$('#mySVG').height());
        console.log("the width of svg is :"+$('#mySVG').width());
        
          $('#mySVG').css({
            'transform': 'scale(' + val + ')'  
            
        });
        $('#mySVG').css({
            'transform-origin': 'top'  
       
        });
    });
    
    var count=1;
    $('#zoom_out').on('click', function() {

        var val=count+ +0.1;
        count=val;
        console.log("the height of svg is :"+$('#mySVG').height());
        console.log("the width of svg is :"+$('#mySVG').width());
        
          $('#mySVG').css({
            'transform': 'scale(' + val + ')'  
            
        });
        
    });

    $('#reset').on('click', function() {

        var val="1.0";
        
          $('#mySVG').css({
            'transform': 'scale(' + val + ')'  
            
        });
        //$('#mySVG').css("top","0px");
       
    });
    
      var dataString="data/GOG123.json";
      $(function() {
        $('#gtb_medium_svg').on('click', function() {
            
        //   divMaker();
        //   $("#myUL").empty();
        //   init();
          var o = document.body.getElementsByTagName("object")[0];
          o.data="svg/mansi.svg";
          dataString="data/GOG123.json";
    
          deleteData();
          mainFunc();
        });
    });
    $(function() {
        $('#gtb_small_svg').on('click', function() {
            
        //   divMaker();
        //   $("#myUL").empty();
        //   init();
          var o = document.body.getElementsByTagName("object")[0];
          o.data="svg/G00033MO.svg";
          dataString="data/GOG123.json";
          deleteData();
          mainFunc();
        });
    });
    
    
      function mainFunc(){
      setTimeout(function(){
            
        // Intializing all the required variables
        console.log("I reached here");
      var i;
      var string="";
      var flag=1;// Flag for approaching the first element of the nodes
      //var flag1=0;// Flag for approaching the first element of the enzymes
      var flag2=1;// Flag for approaching the first element inside the graying out of all nodes before nodes
      var flag3=1;// Flag for approaching the first element inside the graying out all nodes before enzymes
      var html_doc;
      var html_doc_nodes;
      var previous;// Storing the previous variable
      var previous1;// Storing the previous variable
      var flash=0;
      var node_index=new Array();
      var sNode1=new Array();
      var sBond=new Array();
      var count=1.0;
        
    
        
    
    
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
    
                // Function to adjust the size of the SVG and placing it in the center of the SVG
                $(function(){
                var x= document.getElementById("container");
                var x=$("#container");   
                var svg = svgDoc.querySelector('svg');
                var box = svg.getAttribute('viewbox');
                var theArray = box.replace(/^\s+|\s+$/g, '').split(/\s+/);
                document.getElementById('mySVG').setAttribute("width", theArray[2]);
                document.getElementById('mySVG').setAttribute("height",theArray[3]);
                var len=$("#myUL").width()+'px';
    
    
    
    
    
                // Determining if the scrollbar width is counted or not
    
                    // If the width doesn't need the scrollbar so image should be centered from the left
                    var svgWidth1=(parseFloat(parentWidth).toFixed(2))-(parseFloat(leftSide).toFixed(2))-(parseFloat(rightSide).toFixed(2));
                    if((theArray[2])<=svgWidth1 ){
                        var leftWidth=(parseFloat(svgWidth1/2).toFixed(2))-((parseFloat(theArray[2])/2).toFixed(2)) +'px';
                        $("#mySVG").css("left",leftWidth); 
                    }
    
                    // If the height doesn't need the scrollbar so image should be centered from the top
                    if((theArray[3])<=parentHeight ){
                    var topHeight=(parseFloat(parentHeight/2).toFixed(2))-((parseFloat(theArray[3])/2).toFixed(2)) +'px';
                    $("#mySVG").css("top",topHeight);   
                    }
    
                    // If the width doesnt have scrollbar and height has scrollbar
                    if((theArray[2]<=svgWidth1) && (theArray[3]>=parentHeight)){
                    var widthReduction = +svgWidth1 - +17;
                    widthReduction=(parseFloat((widthReduction/2)).toFixed(2));
                    var leftSpace=widthReduction-(parseFloat((theArray[2]/2)).toFixed(2)); +'px';
                    $("#mySVG").css("left",leftSpace);
                    }
    
                    // If the height doesnt have scrollbar and width has scrollbar
                    if((theArray[3]<=parentHeight) && (theArray[2]>=svgWidth1)){
                    var heightReduction = +parentHeight - +17;
                    heightReduction=(parseFloat((heightReduction/2)).toFixed(2));
                    var topSpace=heightReduction-(parseFloat((theArray[3]/2)).toFixed(2)); +'px';
                    $("#mySVG").css("top",topSpace);
                    }
    
                    // If the width of the svg container is less than the height of the SVG
                    if(svgWidth1<=theArray[2]){
                        $("#mySVG").css("left","0px");
                    }
    
                    // If the width of the svg container is less than the height of the SVG
                    if(parentHeight<=theArray[3]){
                        $("#mySVG").css("top","0px");
                    }
    
                });
                    
    
    
    
                        
    
                // Function to zoom in and zoom out
                // $(function() {
                //   $('#text').on('click', function() {
                    
    
                //     var o = document.body.getElementsByTagName("object")[0];
                //     o.data="svg/small.svg";
    
                //       var val=count-0.1;
                //       count=val;
                    
    
                    //     $('#mySVG').css({
                    //       'transform': 'scaleX(' + val + ')'  
                        
                    //   });
                    //   $('#mySVG').css({
                    //     'transform-origin': 'top left'  
                    // FINAL FOR PUTTING IT IN THE LEFT CORNER
                    // });
                    
    
                    // Temporary COmmented
                    // var mywidth =  ($('#mySVG')[0].getBoundingClientRect().width);
                    // var myheight = ($("#mySVG")[0].getBoundingClientRect().height);
                    // console.log("the width after scaling is: "+mywidth);
                    // console.log("the height after scaling is:"+myheight);
                    // console.log("the height of svg is :"+$('#mySVG').height());
                    // y=y*2;
                
                    // var finalHeight=(((('-'+(($('#mySVG').height()-myheight)))))/2) + 'px';
                    // var finalWidth= ((('-'+(($('#mySVG').width()-mywidth))))/2) + 'px';
                    // console.log("the final heigth is :"+finalHeight);
                    // // finalHeight=(-1)*(finalHeight+finalHeight);
                    // // finalWidth=(-1)*(finalWidth+finalWidth_;
                    // //lastTry=lastTry+lastTry;
                    // $('#mySVG').transition({ x: finalWidth,y: finalHeight   });
                
                
                
                    
                    
                    
                    
                    
                    
                //   });
                // });
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
                        $ajaxUtils.sendGetRequest(dataString, function (res) {
    
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
    
                  console.log("the enzyme map is :"+enzymeMap);
                // Forming the array with the lighten shade of each node color
                        for(var j=0;j<sNode.length;j++){
                        var hex=sNode[j].getAttribute("fill");
                        var nis1 = sNode[j].getAttribute("nodeIndex");
                            var c=pSBC ( 0.70, hex);
                            grey_scale[nis1]=c;
                            // grey_scale[nis2]=d;
                            // c.getAttribute("ht");
    
                        
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
    
                          var flag1=0;
    
                        // Creating buttons for the nodes
                            var root1 = $('#ul_tea');
                        
                            enzymeMap.forEach(function(v, k){
                                if(flag1!=enzymeMap.size){
                                html_doc="<li><Button class='Nodes' id ='b1" + k +"'> >> "+ k  + "</Button></li>";
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
                                for (var i = 0; i < sNode.length; i++) {
                                sNode[i].setAttribute("stroke","#DCDCDC");
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
                                html_doc_nodes = "<li><Button id ='b1" + res.residues[j].index+"'> >> "+res.residues[j].index+" : "+res.residues[j].name + "</Button></li>";
                                var jqHtmlPart_nodes = $(html_doc_nodes);
                                var jqObjB1_nodes = jqHtmlPart_nodes.find("#b1" + res.residues[j].index);
    
    
                            // Hovering addition 
                            jqObjB1_nodes.mouseenter(function() {
                            $(this).css("background", "#e6e6e6").css("border-radius", "3px");
                        });
                        jqObjB1_nodes.mouseleave(function() {
                            $(this).css("background", "cornsilk");
                        });
    
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
                //$( "<style> .Nodes { width:100%}  button {background-color: Transparent;background-repeat:no-repeat;border: none;cursor:pointer; border:black; width:100%; text-align:left;}</style> " ).appendTo( "head" );
    
                //
                //var toggler = document.getElementsByClassName("caret");// Getting the elements for the hireachical structures
                
                   
                
             
                
            
                },100);// END OF THE TIMEOUT FUNCTION
            }
            var toggler = $(".caret");
            for (i = 0; i < toggler.length; i++) {
                console.log("The caret is reached"+toggler.length);
                toggler[i].addEventListener("click", function() {
                this.parentElement.querySelector(".nested").classList.toggle("active");
                this.classList.toggle("caret-down");
                //flash=1;
                });
            }
    }
    var svg_id,json_id;
    function setParamId(id1,id2){
         svg_id=id1;
         json_id=id2
        // console.log("The id is :"+svg_id);
    
    }