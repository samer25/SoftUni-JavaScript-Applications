async function students(){
    const form = document.getElementById('form')

    await getStudents()

    form.addEventListener('submit', onCreate)


}

async function onCreate(ev){
    ev.preventDefault()
    const formData = new FormData(ev.target)

    const firstName = formData.get('firstName').trim()
    const lastName = formData.get('lastName').trim()
    const facultyNumber = formData.get('facultyNumber')
    const grade = Number(formData.get('grade'))
    if (firstName !== '' && isNaN(firstName) && lastName !== '' && isNaN(lastName) &&
        facultyNumber !== 0 && !isNaN(facultyNumber) && facultyNumber !== '' && grade !== 0 && !isNaN(grade)){
        await createStudent({firstName, lastName, facultyNumber, grade})
        await getStudents()
        form.reset()
    }



}

async function getStudents(){
    const tbody = document.querySelector('tbody')

    const url = 'http://localhost:3030/jsonstore/collections/students'

    tbody.replaceChildren()
    const response = await fetch(url)
    const data = await response.json()

    Object.values(data).forEach(s =>{
        let tr = document.createElement('tr')

        tr.innerHTML = `
            <td>${s.firstName}</td>
            <td>${s.lastName}</td>
            <td>${s.facultyNumber}</td>
            <td>${s.grade}</td>

        `
        tbody.appendChild(tr)
    })
}

async function createStudent(data){
    const url = 'http://localhost:3030/jsonstore/collections/students'
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return  result
}

students()