
const App=() => {
return(
    render(<div>
        <center>
        <h2>HTML implementation of SVG methods</h2>
    </center>
      
  <div id="mainPage">  
  
  <div id="container" > 
      <object type="image/svg+xml" id="mySVG"  data="svg/G67612NO.svg">
          Your browser does not support SVG
        </object>
  </div>
  
  
  
  
  <div id="infoDiv1"> 
      <center>
       RESIDUE PROPERTIES WILL BE DISPLAYED HERE 
      </center>
  </div>
  
  <div id="infoDiv2"> 
      <center>
        ENZYMES
      </center>
  </div>
  
  
  
  <ul id="myUL" > 
    <li><span class="caret">Nodes</span>
      <ul id="ul_bev" class="nested">
      </ul>
    </li>
    <li><span class="caret">Enzymes</span>
      <ul id="ul_tea" class="nested">
      </ul>
    </li>
  </ul>
  </div>
        </div>)
);
};

ReactDOM.render(<App/>,document.getElementById('root'));