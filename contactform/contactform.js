document.addEventListener('DOMContentLoaded', () => {

    var a, b;
    a = Math.floor((Math.random() * 10) + 1);
    b = Math.floor((Math.random() * 10) + 1);
    document.querySelector('#firstNumber').innerHTML = a;
    document.querySelector('#secondNumber').innerHTML = b;


    document.querySelector('#form').onsubmit = () => {
      document.querySelector('#submit').disabled = true;
      let Name = document.querySelector('#Name').value;
      let Phone = document.querySelector('#Phone').value;
      let Subject =  document.querySelector('#Subject').value;
      let Message = document.querySelector('#Message').value;
      let text = Name + '-' + Phone + ' *' + Subject + '* ' + Message;
      let url = 'https://cors-anywhere.herokuapp.com/http://api.msg91.com/api/v2/sendsms?country=91';

      let data = {
        sender: "UNISLN",
        route: "4",
        country: "91",
        sms: [
          {
            message: text,
            to: [
              "7275861649"
            ]
          }
        ]
      }

      if(parseInt(document.querySelector('#robot').value) === (a + b)) {
        fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "authkey": "261647AzzZCr0ygI5c5ad727",
            "Content-Type": "application/json"
          }
        }).then(res => res.json())
        .then(response => {
          let next = JSON.stringify(response);
          if(response.type === 'success') {
            console.log(next);
            document.querySelector('#result').innerHTML = 'Message is successfully sent!';
            document.querySelector('#Name').value = '';
            document.querySelector('#Phone').value = '';
            document.querySelector('#Message').value = '';
            document.querySelector('#Subject').value = '';
            document.querySelector('#robot').value = '';
            setTimeout(() => {
              document.querySelector('#result').innerHTML = '';
              a = Math.floor((Math.random() * 10) + 1);
              b = Math.floor((Math.random() * 10) + 1);
              document.querySelector('#firstNumber').innerHTML = a;
              document.querySelector('#secondNumber').innerHTML = b;

              document.querySelector('#submit').disabled = false;
            }, 5000);
          }
          else {
            document.querySelector('#wrong').innerHTML = 'Something went wrong! Try again later.';
            setTimeout(() => {
              document.querySelector('#wrong').innerHTML = '';
              document.querySelector('#submit').disabled = false;
            }, 5000);
          }
        })
        .catch(error => console.error('Error:', error));

      }
      else {
        document.querySelector('#wrong').innerHTML = 'Oops! Wrong addition!';
        setTimeout(() => {
              document.querySelector('#wrong').innerHTML = ''
              document.querySelector('#submit').disabled = false;
            }, 5000);
      }

      return false;
    }
  });