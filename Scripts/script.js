$(function() {

  emailjs.init("Mw7glDEvw7fN3HM61");

  $("#contactForm").submit(function(e) {
    e.preventDefault();

    let valid = true;

    let name = $("#name").val().trim();
    let email = $("#email").val().trim();
    let message = $("#message").val().trim();

    $(".error-name").text("");
    $(".error-email").text("");
    $(".error-message").text("");

    $("input, textarea").removeClass("is-invalid is-valid");

    // validaciones 
    if (name === "") {
      $(".error-name").text("El nombre es obligatorio").hide().fadeIn(200);
      $("#name").addClass("is-invalid");
      valid = false;
    } else {
      $("#name").addClass("is-valid");
    }

    if (email === "") {
      $(".error-email").text("El email es obligatorio").hide().fadeIn(200);
      $("#email").addClass("is-invalid");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      $(".error-email").text("Email inválido").hide().fadeIn(200);
      $("#email").addClass("is-invalid");
      valid = false;
    } else {
      $("#email").addClass("is-valid");
    }

    if (message === "") {
      $(".error-message").text("El mensaje es obligatorio").hide().fadeIn(200);
      $("#message").addClass("is-invalid");
      valid = false;
    } else {
      $("#message").addClass("is-valid");
    }

    if (valid) {
      emailjs.send("service_54ijvxn", "template_7iq1ndu", {
        name: name,
        email: email,
        message: message
      })
      .then(function() {
        alert("Correo enviado!");

        $("#contactForm")[0].reset();
        $("input, textarea").removeClass("is-valid");
      })
      .catch(function(error) {
        alert("Error al enviar");
        console.log(error);
      });
    }

  });

});