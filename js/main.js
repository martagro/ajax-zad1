function ajax(method, url) {
    //utworzenie obiektu HMLHttpRequest
    var httpReq = new XMLHttpRequest();

    //otwieramy połączenie z serwerem za pomocą httpReq
    httpReq.open(method, url);

    //status połączenia
    // 0: połączenie nienawiązane
    // 1: połączenie nawiązane
    // 2: połączenie odebrane
    // 3: przetwarzanie żądania
    // 4: dane zwrócone i gotowe do użycia

    httpReq.onreadystatechange = function () {
        //jeśli 4: dane zwrócone i gotowe
        if (httpReq.readyState == 4) {
            //sprawdź kod statusu połącznia, jeśli 200, działaj
            if (httpReq.status == 200) {

                //responseText - zwrócone dane w formacie tekstowym
                var returnData = httpReq.responseText;

                httpReq.onsuccess(returnData); // wywołanie odniesienie do funkcji, która parsuje tekst do jsona; dane zostaną zwrócone jako json

                //zeruj obiekt, aby nie utrzymywać połączenia z serwerem
                httpReq = null;
            }
        }
    }

    httpReq.onerror = function (response) {
        console.log('error');
    }


    httpReq.onsuccess = function (response) {
        var jsonObj = JSON.parse(response);
        //console.log(jsonObj);
        var paragraf_1 = document.createElement('p');
        var paragraf_2 = document.createElement('p');
        var paragraf_3 = document.createElement('p');

        paragraf_1.innerHTML = jsonObj.userId;
        paragraf_2.innerHTML = jsonObj.userName;
        paragraf_3.innerHTML = jsonObj.userURL;

        document.body.appendChild(paragraf_1);
        document.body.appendChild(paragraf_2);
        document.body.appendChild(paragraf_3);


    }

    //wysyłanie żądania do serwera
    httpReq.send();
}

function pobierzDane() {
    document.getElementById('button').addEventListener('click', function () {
        ajax('GET', 'http://echo.jsontest.com/userId/108/userName/Akademia108/userURL/akademia108.pl');
    })
}

pobierzDane();
