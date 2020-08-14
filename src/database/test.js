const DataBase = require('./db.js')
const createProffy = require('./createProffy')

DataBase.then(async (db) => {
    //inserir dados
    proffyValue = {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "1691020821",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    }

    classValue = {
        subject: 1,
        cost: "20",
        // proffy_id
    }

    classScheduleValues = [
        //class_id
        {
            weekday: 1,
            time_from: 666,
            time_to: 777
        },
        {
            weekday: 0,
            time_from: 1000,
            time_to: 1200
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})    //Consultar dados inseridos

    // Todos os proffys
    const selectedproffes = await db.all("SELECT * FROM proffys")
    console.log(selectedproffes)

    
    const selectedClassesAndProffes = await db.all(`
        SELECT
            classes.*,
            proffys.*
        FROM
            proffys
        INNER JOIN classes ON  (classes.proffy_id = proffys.id)
        WHERE
            classes.proffy_id = 1;
    `)
    console.log(selectedClassesAndProffes)


    const selectedClasseSchedules = await db.all(`
        SELECT
            classes_schedule.*
        FROM
            classes_schedule
        WHERE
            classes_schedule.classe_id = 1
        AND classes_schedule.weekday = 1
        AND classes_schedule.time_from <= "1200"
        AND classes_schedule.time_to > "1200"
    `)
    console.log(selectedClasseSchedules)
})