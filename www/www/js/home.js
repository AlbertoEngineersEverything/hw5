var dohome = function(){
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    let h1 = document.createElement('h1');
    let text = document.createTextNode("Welcome to my FAU APP");
    h1.appendChild(text);
    workspace.append(h1);
    let h3 = document.createElement('h3');
    text = document.createTextNode("Alberto Sempertegui : Z 15199785");
    h3.appendChild(text);
    workspace.appendChild(h3);
    
}