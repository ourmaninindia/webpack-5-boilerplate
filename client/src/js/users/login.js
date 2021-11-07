import '@/js/bootstrap.bundle'
import '@/sass/users.scss'


function _renderData(json) {
  let responseEl = document.querySelector('#response');
  responseEl.innerHTML = json.message;
}

const button = document.getElementById('login');
button.addEventListener('click', async event => {

  	let email  	 = document.getElementById('email').value;
	let password = document.getElementById('password').value;

	//if(email && password){

		console.log('data is '+email+' ' +password);

		const data 	  = { email, password };

		const options = {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(data)
		};

	  	const response 	= await fetch('/api/login',options);
	    const json 		= await response.json();
	    console.log(json);
	    _renderData(json)

    //} else { 	console.log('No email or password passed');    };
});