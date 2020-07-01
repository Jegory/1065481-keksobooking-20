var arrayTest = [1, 2, 3, 4, 5, 6, 7, { fruit: 'apple' }, 'rock', 'jaz'];

arrayTest.unshift('ruby');

arrayTest.pop();

arrayTest.splice(2, 2, ('New text', 34, 444));

arrayTest.push('rock-n-Roll');


console.log(arrayTest);