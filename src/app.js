import m1 from './modules/m1';
import './styles/styles.css';
import './styles/s.scss';
import './modules/babel';

console.log("It's app.js log");

m1();

[1, 2, 3].forEach(item => console.log(item));

const a = document.querySelector('h2');
a.style.background = 'red';
