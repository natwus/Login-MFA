import emailjs from "@emailjs/browser";

export function enviarEmail(nome, codigo, email) {
    const templateParams = {
        para: nome,
        texto: codigo,
        email: email,
    };

    emailjs.send(
        "service_teno3ly", // Service ID
        "template_jp8xmxf", // Template ID
        templateParams,
        "ZbyNu_dDhdSR4-sfc" // Public key
    ).then(
        (response) => {
            console.log("EMAIL ENVIADO", response.status, response.text);
        },
        (err) => {
            console.log("ERRO: ", err);
        }
    );
}
