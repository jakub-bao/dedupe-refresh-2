

export function fixDuplicateColumns(){
    let duplicatesTable = document.querySelector('.duplicatesListTable') as HTMLElement;
    let totalWidth = duplicatesTable.offsetWidth;
    if (!totalWidth) return;
    document.querySelectorAll('.duplicateColumn').forEach((column:HTMLElement)=>{
        column.style.width = '25%';
    });
}