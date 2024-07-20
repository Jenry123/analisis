const express = require('express');
const { performance } = require('perf_hooks');
const dataset = require('./bussines.json');
const SimpleArray = require('../models/SimpleArray.js');
const LinkedList = require('../models/linkedList.js');
const { bubbleSort, mergeSort, radixSort } = require('../models/sortingAlgorithms.js');

const app = express();
const port = 3000;

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static('../../public'));

app.get('/data', async (req, res) => {
    const type = req.query.type;
    if (!type) {
        return res.status(400).json({ error: 'Invalid type' });
    }

    let times = [];
    let labels = [];
    
    const numItems = 100;
    const limitedDataset = dataset.slice(0, numItems);

    try {
        switch (type) {
            case 'insertion':
                // SimpleArray insertion time
                {
                    const simpleArray = new SimpleArray();
                    const start = performance.now();
                    limitedDataset.forEach(item => simpleArray.insert(item));
                    const end = performance.now();
                    times.push((end - start).toFixed(2));
                    labels.push('SimpleArray');
                }

                // LinkedList insertion time
                {
                    const linkedList = new LinkedList();
                    const start = performance.now();
                    limitedDataset.forEach(item => linkedList.addNode(item));
                    const end = performance.now();
                    times.push((end - start).toFixed(2));
                    labels.push('LinkedList');
                }
                break;

            case 'search':
                const searchItem = limitedDataset[Math.floor(Math.random() * limitedDataset.length)];

                // SimpleArray search time
                {
                    const simpleArrayForSearch = new SimpleArray();
                    let start = performance.now();
                    limitedDataset.forEach(item => simpleArrayForSearch.insert(item));
                    simpleArrayForSearch.search(searchItem);
                    let end = performance.now();
                    times.push((end - start).toFixed(2));
                    labels.push('SimpleArray');
                }

                // LinkedList search time
                {
                    const linkedListForSearch = new LinkedList();
                    limitedDataset.forEach(item => linkedListForSearch.addNode(item));
                    let start = performance.now();
                    linkedListForSearch.findNode(searchItem);
                    let end = performance.now();
                    times.push((end - start).toFixed(2));
                    labels.push('LinkedList');
                }
                break;

            case 'sorting':
                const arrayData = limitedDataset.slice();

                // BubbleSort time
                {
                    const start = performance.now();
                    bubbleSort([...arrayData]);
                    const end = performance.now();
                    times.push((end - start).toFixed(2));
                    labels.push('BubbleSort');
                }

                // MergeSort time
                {
                    const start = performance.now();
                    mergeSort([...arrayData]);
                    const end = performance.now();
                    times.push((end - start).toFixed(2));
                    labels.push('MergeSort');
                }

                // RadixSort time
                {
                    const start = performance.now();
                    radixSort([...arrayData]);
                    const end = performance.now();
                    times.push((end - start).toFixed(2));
                    labels.push('RadixSort');
                }
                break;

            default:
                return res.status(400).json({ error: 'Invalid type' });
        }

        res.json({ labels, times });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
