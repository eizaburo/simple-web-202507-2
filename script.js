//要素の取得
const title = document.getElementById("title");
const email = document.getElementById("email");
const message = document.getElementById("message");
const button = document.getElementById("button");

//エラー要素の取得
const error_message_title = document.getElementById("error-message-title");
const error_message_email = document.getElementById("error-message-email");
const error_message_message = document.getElementById("error-message-message");

//エラーバターン生成
const title_regex = /^.{1,10}$/;
const email_regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const message_regex = /^.{1,10}$/;

button.addEventListener("click", async (e) => {
    e.preventDefault();

    //エラーメッセージ一旦非表示
    error_message_title.classList.remove("show");
    error_message_email.classList.remove("show");
    error_message_message.classList.remove("show");

    if (!title_regex.test(title.value)) {
        error_message_title.classList.add("show");
    }

    if (!email_regex.test(email.value)) {
        error_message_email.classList.add("show");
    }

    if (!message_regex.test(message.value)) {
        error_message_message.classList.add("show");
    }

    if (!error_message_title.classList.contains("show") &&
        !error_message_email.classList.contains("show") &&
        !error_message_message.classList.contains("show")) {

        // alert(`title:${title.value}, email:${email.value}, message:${message.value}`);

        try {

            //自分のGAS API URLに入れ替える
            const url = "https://script.google.com/macros/s/デブロイID/exec";

            const result = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    title: title.value,
                    email: email.value,
                    message: message.value
                }).toString()
            });

            const responseText = await result.text();
            alert(responseText);

        } catch (error) {
            alert(error);
        }


    }
});

title.addEventListener("keyup", () => {
    if (title_regex.test(title.value)) {
        error_message_title.classList.remove("show");
    } else {
        error_message_title.classList.add("show");
    }
});

email.addEventListener("keyup", () => {
    if (email_regex.test(email.value)) {
        error_message_email.classList.remove("show");
    } else {
        error_message_email.classList.add("show");
    }
});

message.addEventListener("keyup", () => {
    if (message_regex.test(message.value)) {
        error_message_message.classList.remove("show");
    } else {
        error_message_message.classList.add("show");
    }
});