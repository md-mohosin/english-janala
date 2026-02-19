const lessonContainer = document.getElementById("lesson-container")


function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displyLesson(json.data))

}

const displyLesson = (lessons) => {
    lessonContainer.innerHTML = ''
    lessons.forEach(lesson => {
        const div = document.createElement("div")
        div.innerHTML = `<button id='lesson-btn-${lesson.level_no}' onclick='loadWord(${lesson.level_no})' class="btn btn-outline btn-primary lesson-btn"><i
                            class="fa-solid fa-book-open"></i>${lesson.lessonName}</button>`
        lessonContainer.appendChild(div)

    })
}

loadLessons()



const removeActive = () => {
    const activBtn = document.querySelectorAll(".lesson-btn")
    activBtn.forEach(btn => btn.classList.remove("active"))
}


const wordContainer = document.getElementById("load-word")

const loadWord = (level) => {
    fetch(`https://openapi.programming-hero.com/api/level/${level}`)
        .then(res => res.json())
        .then(data => {
            removeActive()
            const clickBtn = document.getElementById(`lesson-btn-${level}`)
            clickBtn.classList.add("active")
            displyWord(data.data)
        })
}





const displyWord = (words) => {
    wordContainer.innerHTML = ''
    if (words.length == 0) {
        wordContainer.innerHTML = `<div class="text-center space-y-4 col-span-full">
                <img class="justify-self-center" src="./assets/alert-error.png" alt="">
                <p class="font-bangla text-[14px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <p class="font-bangla text-3xl font-medium">নেক্সট Lesson এ যান</p>
            </div>
`
    }
    words.forEach(word => {
        const div = document.createElement("div")
        div.innerHTML = `<div class="max-w-[547px] w-full h-96 bg-white p-4 md:p-12 flex flex-col  justify-between rounded-xl">
                    <div class="text-center space-y-6">
                        <h3 class="text-2xl font-bold">${word.word ? word.word : 'No word found 😢'}</h3>
                        <p class="text-sm font-medium">Meaning/Pronounciation</p>
                        <p class="text-2xl font-semibold text-[#464649]">${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি ☹️'}/ইগার</p>
                    </div>
                    <div class="flex justify-between">
                        <button onclick="getWordDetails(${word.id})" class="btn border-none w-14 h-14 bg-[#E8F4FF] p-4 rounded-lg">
                            <i class="fa-solid fa-circle-info"></i>
                        </button>
                        <button onclick="pronounceWord('${word.word}')" class="btn border-none w-14 h-14 bg-[#E8F4FF] p-4 rounded-lg">
                            <i class="fa-solid fa-volume-high"></i>
                        </button>
                    </div>
                </div>`
        wordContainer.appendChild(div)

    })
}




const getWordDetails = async (id) => {
    const data = await fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    const result = await data.json()
    displayWordDetails(result.data)
}


const createEelements = (arry) => {
    const allElements = arry.map(element => `<button class='btn mr-4'>${element}</button>`)
    return allElements.join(" ")
}


const modalContainer = document.getElementById("modal-container")

const displayWordDetails = (data) => {
    modalContainer.innerHTML = ``
    const div = document.createElement("div")
    div.innerHTML = `<div class="space-y-8">
                        <h3 class="text-3xl font-semibold">${data.word} (${data.pronunciation})</h3>
                        <div class="space-y-2">
                            <h3 class="text-xl font-semibold">Meaning</h3>
                            <p class="text-[17px]">${data.meaning}</p>
                        </div>
                        <div class="space-y-2">
                            <h3 class="text-xl font-semibold">Example</h3>
                            <p class="text-[17px]">The kids were eager to open their gifts.</p>
                        </div>
                        <div class="space-y-2">
                            <h3 class="text-xl font-semibold">সমার্থক শব্দ গুলো</h3>
                            <p class="text-[17px]">${createEelements(data.synonyms)}</p>
                        </div>
                    </div>`
    modalContainer.appendChild(div)
    document.getElementById("word_modal").showModal()
}








document.getElementById("btn-search").addEventListener("click", () => {
    const input = document.getElementById("search-input")
    const inputValue = input.value.trim().toLowerCase();

    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
            const allWord = data.data
            const filterWord = allWord.filter(word => word.word.toLowerCase().includes(inputValue))
            displyWord(filterWord)
        })
        removeActive()
})