import {html, render } from './node_modules/lit-html/lit-html.js'

const studentRow =(student) => html`
    <tr class=${student.match ? 'select': ''}>
        <td>${student.firstName} ${student.lastName}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>
    </tr>
`;

const input = document.getElementById('searchField')
document.getElementById('searchBtn').addEventListener('click', onSearch)
let students;
start()
async function start(){
    const res = await fetch('http://localhost:3030/jsonstore/advanced/table')
    const data = await res.json()
    students = Object.values(data)
    students.forEach(s => s.match = false)
    update()
}

function update(){
    render(students.map(studentRow), document.querySelector('tbody'))
}

function onSearch(){
    const value = input.value.trim().toLocaleLowerCase()

    for(let item of students){
        // will return false or True
        item.match = Object.values(item).some(v => v.toString().toLocaleLowerCase().includes(value))
    }
    update()
}