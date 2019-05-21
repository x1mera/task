(function($){
    $(document).ready(function(){  
        $("#formReg").submit(function(e){
            e.preventDefault();
//            проверяем пароль на совпадение
            var $pass = $("#pass_reg").val(),
                $con_pass = $("#con_pass").val(),
                $login = $("#login_reg").val(),
                $name = $("#name").val(),
                $email = $("#mail").val();
                
            if ($pass != $con_pass){
                e.preventDefault();
                alert("Ведённые пароли не совпадают");
                return false; // прерываем выполнение дальнейшей проверки
            } 
//            проверяем поля login и email на уникальность
                $.ajax({
                    url: "one.php",
                    method: "POST",
                    dataType : "json",
                    success: function(res){
                        for (i=0; i<res.user.length; i++){
                            var count = 0;
                            if (res.user[i].login == $login || res.user[i].email == $email) {
                                count += 1;
                                e.preventDefault();
                                alert("Login или email уже исользуются");
                                return false; // прерываем выполнение дальнейшей проверки
                            };
                        };
//                        В случае уникальности login и email добавляем нового пользователя в JSON и передаем в two.php
                        if (count == 0){
                                var newUser = {
                                    login: $login,
                                    pass: $pass,
                                    email: $email,
                                    name: $name
                                },
                                    str;
                                res.user.push(newUser);
                                str = JSON.stringify(res.user);
//                                $.ajax({
//                                  type: "POST",
//                                  url: "two.php",
//                                  data: {request:str},
//                                  success: function(res) {
//                                    console.log(rez);
//                                  }
//                                });
                        }; 
                    }
                });
        });
//        Вход под логином
        $("#formAv").submit(function(e){
            e.preventDefault();
            var $loginAV = $("#login_av").val(),
                $passAV = $("#pass_av").val();
            $.ajax({
                url: "one.php",
                method: "POST",
                dataType : "json",
                success: function(res){
                    for (i=0; i<res.user.length; i++){
                       var count = 0;
                        if (res.user[i].login == $loginAV && res.user[i].pass == $passAV) {
                            count +=1;
                            e.preventDefault();
                            $("body").html("<h1>Hello, "+res.user[i].name+"</h1>")
                            return; 
                        } else if(count == 0){
                            alert("Днный пользователь не зарегестрирован, проверьте login и пароль")
                            return false;
                        };
                    };
                }
            });
        });
    })
})(jQuery)