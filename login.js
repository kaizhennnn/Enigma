// Function to show/hide password
const passwordAccess = (loginPass, loginEye) => {
   const input = document.getElementById(loginPass),
         iconEye = document.getElementById(loginEye);

   iconEye.addEventListener('click', () => {
       // Change password to text
       input.type = input.type === 'password' ? 'text' : 'password';

       // Icon change
       iconEye.classList.toggle('ri-eye-fill');
       iconEye.classList.toggle('ri-eye-off-fill');
   });
};

passwordAccess('password', 'loginPassword');

const passwordRegister = (loginPass, loginEye) => {
   const input = document.getElementById(loginPass),
         iconEye = document.getElementById(loginEye);

   iconEye.addEventListener('click', () => {
       // Change password to text
       input.type = input.type === 'password' ? 'text' : 'password';

       // Icon change
       iconEye.classList.toggle('ri-eye-fill');
       iconEye.classList.toggle('ri-eye-off-fill');
   });
};

passwordRegister('passwordCreate', 'loginPasswordCreate');

// Show/hide login & create account
const loginAcessRegister = document.getElementById('loginAccessRegister'),
     buttonRegister = document.getElementById('loginButtonRegister'),
     buttonAccess = document.getElementById('loginButtonAccess');

buttonRegister.addEventListener('click', () => {
   loginAcessRegister.classList.add('active');
});

buttonAccess.addEventListener('click', () => {
   loginAcessRegister.classList.remove('active');
});

// User registration and login logic
const users = JSON.parse(localStorage.getItem('users')) || [];

// Registration form submission
document.querySelector('.login__register .login__form').addEventListener('submit', function(event) {
   event.preventDefault();

   const names = document.getElementById('names').value;
   const surnames = document.getElementById('surnames').value;
   const emailCreate = document.getElementById('emailCreate').value;
   const passwordCreate = document.getElementById('passwordCreate').value;

   // Check if the user already exists
   const userExists = users.some(user => user.email === emailCreate);
   if (userExists) {
       alert('User  already exists! Please use a different email.');
       return;
   }

   // Register the new user
   users.push({ names, surnames, email: emailCreate, password: passwordCreate });
   localStorage.setItem('users', JSON.stringify(users));
   alert('Registration successful! You can now log in.');
   loginAcessRegister.classList.remove('active'); // Switch to login view
});

// Login form submission
document.querySelector('.login__access .login__form').addEventListener('submit', function(event) {
   event.preventDefault();

   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;

   // Check if the user exists and the password matches
   const user = users.find(user => user.email === email && user.password === password);
   if (user) {
       alert('Login successful! Welcome back, ' + user.names + '!');
       // Redirect or perform further actions here
   } else {
       alert('Invalid email or password!');
   }
});