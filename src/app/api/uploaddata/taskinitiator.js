import worker from "./worker"
export const id = []

export function taskinitiator(pdfId) {
console.log(pdfId);
    if (id.length==0) {
        id.push(pdfId)
        worker()

    }
    else {
        id.push(pdfId)


    }


}