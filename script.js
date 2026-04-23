
const algoInfo = {
    bubble: {
        name: "Bubble Sort",
        complexity: "Time: O(n²) worst, O(n) best",
        desc: "Repeatedly compares adjacent elements and swaps them. Largest element moves to end in each pass."
    },
    selection: {
        name: "Selection Sort",
        complexity: "Time: O(n²)",
        desc: "Finds minimum element from unsorted part and places it at correct position."
    },
    insertion: {
        name: "Insertion Sort",
        complexity: "Time: O(n²) worst, O(n) best",
        desc: "Takes element and inserts it into correct position in sorted part."
    },
    merge: {
        name: "Merge Sort",
        complexity: "Time: O(n log n), Space: O(n)",
        desc: "Divides array into halves, sorts them, and merges back."
    },
    quick: {
        name: "Quick Sort",
        complexity: "Best: O(n log n), Worst: O(n²)",
        desc: "Selects pivot, partitions array, and recursively sorts."
    },
    heap: {
        name: "Heap Sort",
        complexity: "Time: O(n log n), Space: O(1)",
        desc: "Builds max heap and extracts elements one by one."
    }
};


let arr = [];

function generateArray() {
    arr = [];
    const container = document.getElementById("array");
    container.innerHTML = "";

    for (let i = 0; i < 30; i++) {
        let val = Math.floor(Math.random() * 200) + 20;
        arr.push(val);

        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = val + "px";

        container.appendChild(bar);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateBars() {
    const bars = document.querySelectorAll(".bar");
    for (let i = 0; i < arr.length; i++) {
        bars[i].style.height = arr[i] + "px";
    }
    await sleep(50);
}

async function bubbleSort() {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                await updateBars();
            }
        }
    }
}

async function selectionSort() {
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) min = j;
        }
        [arr[i], arr[min]] = [arr[min], arr[i]];
        await updateBars();
    }
}

async function insertionSort() {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
            await updateBars();
        }
        arr[j + 1] = key;
        await updateBars();
    }
}

async function merge(l, m, r) {
    let left = arr.slice(l, m + 1);
    let right = arr.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
        await updateBars();
    }

    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
}

async function mergeSort(l, r) {
    if (l >= r) return;
    let m = Math.floor((l + r) / 2);
    await mergeSort(l, m);
    await mergeSort(m + 1, r);
    await merge(l, m, r);
}


async function partition(l, r) {
    let pivot = arr[r];
    let i = l - 1;

    for (let j = l; j < r; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            await updateBars();
        }
    }

    [arr[i + 1], arr[r]] = [arr[r], arr[i + 1]];
    await updateBars();
    return i + 1;
}

async function quickSort(l, r) {
    if (l < r) {
        let pi = await partition(l, r);
        await quickSort(l, pi - 1);
        await quickSort(pi + 1, r);
    }
}

async function heapify(n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        await updateBars();
        await heapify(n, largest);
    }
}

async function heapSort() {
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        await heapify(n, i);

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        await updateBars();
        await heapify(i, 0);
    }
}

async function startSorting() {
    const algo = document.getElementById("algo").value;

    if (algo === "bubble") await bubbleSort();
    else if (algo === "selection") await selectionSort();
    else if (algo === "insertion") await insertionSort();
    else if (algo === "merge") await mergeSort(0, arr.length - 1);
    else if (algo === "quick") await quickSort(0, arr.length - 1);
    else if (algo === "heap") await heapSort();
}


function updateInfo() {
    const algo = document.getElementById("algo").value;
    const info = algoInfo[algo];

    document.getElementById("algoName").innerText = info.name;
    document.getElementById("complexity").innerText = info.complexity;
    document.getElementById("description").innerText = info.desc;
}


generateArray();
updateInfo();