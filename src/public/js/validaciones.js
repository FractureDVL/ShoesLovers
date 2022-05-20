/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

function validarPassword() {
    var password1 = frmUsuario.contrasena.value;
    var password2 = frmUsuario.repetir_contrasena.value;

    if (password1 != password2) {
        document.getElementById("divMensaje").innerHTML = "Error: Las contraseñas no coindicen. ";
        alert("Error: Las contraseñas no coindicen.  " + password1 + " == " + password2);
        frmUsuario.repetir_contrasena.focus();
        return false;
    }
}