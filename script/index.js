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



const wordContainer = document.getElementById("load-word")

const loadWord = (level) => {
    fetch(`https://openapi.programming-hero.com/api/level/${level}`)
        .then(res => res.json())
        .then(data => displyWord(data.data))
}



const displyWord = (words)=>{
    wordContainer.innerHTML = ''
    words.forEach(word => {
        const div = document.createElement("div")
        div.innerHTML=`<div class="max-w-[547px] w-full h-96 bg-white p-12 flex flex-col  justify-between rounded-xl">
                    <div class="text-center space-y-6">
                        <h3 class="text-2xl font-bold">${word.word}</h3>
                        <p class="text-sm font-medium">Meaning/Pronounciation</p>
                        <p class="text-2xl font-semibold">আগ্রহী/ইগার</p>
                    </div>
                    <div class="flex justify-between">
                        <button class="btn border-none w-14 h-14 bg-[#E8F4FF] p-4 rounded-lg">
                            <i class="fa-solid fa-circle-info"></i>
                        </button>
                        <button class="btn border-none w-14 h-14 bg-[#E8F4FF] p-4 rounded-lg">
                            <i class="fa-solid fa-volume-high"></i>
                        </button>
                    </div>
                </div>`
                wordContainer.appendChild(div)
    })
}
