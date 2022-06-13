export const plainTextFormatter = ({
    gamebookTitle,
    authorName,
    chapters,
}) => {
    let text = `${gamebookTitle}\n\n`
    text += `by ${authorName}\n\n`
    text += `=========================\n\n\n`
    chapters.forEach(chapter => {
        text += `${chapter.chapterNumber}\n\n`
        text += `${chapter.content}\n\n\n\n`
    })
    text += 'END'
    return text
};
