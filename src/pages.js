const {subjects, weekdays, getSubject,convertHoursToMinutes} = require('./utils/format')

const DataBase = require('./database/db')

//funcionalidades
function pageLanding(req, res){
    return res.render('index.html')
}

async function pageStudy(req, res){
    console.log(req.query)
    const filters = req.query

    if(!filters.subject || !filters.weekday || !filters.time)
    {
        return res.render('study.html', {filters,subjects,weekdays})
    }

    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT
            classes.*,
            proffys.*
        FROM
            proffys
        INNER JOIN classes ON  (classes.proffy_id = proffys.id)
        WHERE
            EXISTS(
                    SELECT
                        1
                    FROM
                        classes_schedule
                    WHERE
                        classes_schedule.classe_id = classes.id
                    AND classes_schedule.weekday = ${filters.weekday}
                    AND classes_schedule.time_from <= ${timeToMinutes}
                    AND classes_schedule.time_to > ${timeToMinutes}
            )
        AND classes.subject = '${filters.subject}'
    `
    //return res.render('study.html', {proffys, filters,subjects,weekdays})
    try {
        const db = await DataBase;
        const proffys = await db.all(query)

        proffys.map((proffy) =>{
            proffy.subject = getSubject(proffy.subject)
        })
        
        return res.render('study.html', {proffys,filters,subjects,weekdays})
    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res){
    return res.render('give-classes.html',{subjects,weekdays})
}

async function saveClasses(req, res){
    const createProffy = require('./database/createProffy')

    const data = req.body

    const proffyValue = {
        name: data.name,
        avatar: data.avatar,
        whatsapp: data.whatsapp,
        bio: data.bio,
    }

    const classValue = {
        subject: data.subject,
        cost: data.cost,
    }

    const classScheduleValues = data.weekday.map((weekday, index) =>{
            return {
                weekday: weekday,
                time_from: convertHoursToMinutes(data.time_from[index]),
                time_to: convertHoursToMinutes(data.time_to[index])
            }
    })
    
    try {
        const db = await DataBase
        await createProffy(db, {proffyValue, classValue, classScheduleValues})

        let queryString = '?subject=' + data.subject
        queryString += '&weekday=' + data.weekday[0]
        queryString += '&time=' + data.time_from[0]

        return res.redirect('/study' + queryString)
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}