$(function () {
    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // Tratar erros de submissão aqui
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // Evita o envio padrão do formulário
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            var $this = $("#sendMessageButton");
            $this.prop("disabled", true); // Desativa o botão para prevenir múltiplos envios

            $.ajax({
                url: "contact.php",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                },
                cache: false,
                success: function () {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                    $('#success > .alert-success').append("<strong>Sua mensagem foi enviada com sucesso.</strong>");
                    $('#success > .alert-success').append('</div>');
                    $('#contactForm').trigger("reset"); // Reseta o formulário
                },
                error: function () {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Desculpe " + name + ", parece que nosso servidor de e-mail não está respondendo. Por favor, tente novamente mais tarde!"));
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset"); // Reseta o formulário
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false); // Reativa o botão de envio
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});
