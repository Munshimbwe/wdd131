export const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

export function getFormattedLastModified() {
    const fileDate = new Date(document.lastModified);
    return fileDate.toLocaleString('en-US', {
        dateStyle: '2-digit',
        timeStyle: 'medium',
        hour12: false
    }).replace(',', '');
}

export function handleReviewCounter() {
    let count = parseInt(localStorage.getItem("reviewCountTotal"));
    if (isNaN(count)) {
        count = 0;
    }
    count += 1;
    localStorage.setItem("reviewCountTotal", count);
    return count;
}
