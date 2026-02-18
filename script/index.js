const lessonContainer = document.getElementById("lesson-container")


const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displyLesson(json.data))

}

const displyLesson = (lessons) => {
    lessonContainer.innerHTML = ''
    lessons.forEach(lesson => {
        const div = document.createElement("div")
        div.innerHTML = `<button onclick='loadWord(${lesson.level_no})' class="btn btn-outline btn-primary"><i
                            class="fa-solid fa-book-open"></i>${lesson.lessonName}</button>`
        lessonContainer.appendChild(div)

    })
}

loadLessons()



const loadWord = (level) => {
    fetch(`https://openapi.programming-hero.com/api/level/${level}`)
        .then(res => res.json())
        .then(data => console.log(data))
}
