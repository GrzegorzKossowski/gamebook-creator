export const plainTextFormatter = ({
    gamebookTitle,
    authorName,
    introduction,
    chapters,
}) => {
    let text = `${gamebookTitle}\n\n`
    text += `by ${authorName}\n\n`
    text += `=========================\n\n\n`
    text += 'Introduciton\n\n' + introduction + '\n\n'
    chapters.forEach(chapter => {
        text += `${chapter.chapterNumber}\n\n`
        text += `${chapter.content}\n\n\n\n`
    })
    text += 'END'
    return text
};
