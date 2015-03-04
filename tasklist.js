function addTask(){
            var txtinput = document.getElementById('someitemtext').value;
            var txt = document.createElement("p");
            txt.innerHTML = txtinput;
            $('#messages').append(txt);
    
            var box = document.createElement("input");
            box.type = "checkbox";
            box.name="chkbox[]";
            $('#messages').append(box);
            $('#messages').append("<br/>");
            document.getElementById('someitemtext').value=" ";
}
