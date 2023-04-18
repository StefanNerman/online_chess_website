export function hide(element: any){
    element.classList.add('fully-removed')
}

export function unhide(element: any){
    element.classList.remove('fully-removed')
}