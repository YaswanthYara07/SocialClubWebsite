
 var i = 0;

const SPECIALS = [
    { name: 'Event in science club', url: 'project1.jpg' },
    { name: 'join the club', url: 'project2.jpg' },
    { name: 'working at focus', url: 'project3.jpg' },
    { name: 'Yoga at math lawns', url: 'project4.jpg' }
];

var vueinst = new Vue({
    el: '.set',
    data: {
        special: SPECIALS[i]
    }
});
