const search = document.querySelector("#search"),
    display = document.querySelector("#display");

//Search states
const searchStates = async e => {
    const text = e.target.value;
    const res = await fetch("../data/data.json")
    const states = await res.json();
   
    //Get matches
    let matches = states.filter(state => {
        const regex = new RegExp(`^${text}`, "gi");
        return state.name.match(regex) || state.abbr.match(regex)
    });

    if (!text) matches = [];

    if (matches.length === 0 && text)
        display.innerHTML = `<div class="card card-body">No matches</div>`
    else displayResults(matches)
}
//display results
const displayResults = matches => {
    const output = matches.map( match => `
    <div class="card card-body mb-1">
    <h4> ${match.name} (${match.abbr})
    <span class="text-primary">${match.capital}</span>
    </h4>
    <small> Lat: ${match.lat} / ${match.long} </small>
    </div>`).join("")
    display.innerHTML = output;
}
//Delay to prevent unnecessary api calls
const debounce = (fn, delay = 1000) => {
    let timerId;
    return (...args) => {
        if (timerId) clearTimeout(timerId)
        timerId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    }
}
search.addEventListener("input", debounce(searchStates));