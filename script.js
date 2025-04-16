const binStatuses = {
  bin1: 'high', bin2: 'low', bin3: 'medium', bin4: 'low', bin5: 'high',
  bin6: 'medium', bin7: 'high', bin8: 'low', bin9: 'medium', bin10: 'low',
  bin11: 'high', bin12: 'medium', bin13: 'low', bin14: 'high', bin15: 'medium'
};

const bins = [
  { id: 'bin1', name: 'RS Puram', lat: 11.0016, lon: 76.9670 },
  { id: 'bin2', name: 'Gandhipuram', lat: 11.0077, lon: 76.9774 },
  { id: 'bin3', name: 'Peelamedu', lat: 11.0392, lon: 76.9572 },
  { id: 'bin4', name: 'Kovai Pudur', lat: 11.0789, lon: 76.9523 },
  { id: 'bin5', name: 'Singanallur', lat: 11.0341, lon: 76.9519 },
  { id: 'bin6', name: 'Tidel Park', lat: 11.0184, lon: 76.9657 },
  { id: 'bin7', name: 'Ukkadam', lat: 11.0331, lon: 76.9789 },
  { id: 'bin8', name: 'Peelamedu Market', lat: 11.0275, lon: 76.9616 },
  { id: 'bin9', name: 'Saibaba Colony', lat: 11.0102, lon: 76.9553 },
  { id: 'bin10', name: 'Race Course', lat: 10.9979, lon: 76.9648 },
  { id: 'bin11', name: 'Pappanaickenpalayam', lat: 11.0387, lon: 76.9709 },
  { id: 'bin12', name: 'Tatabad', lat: 11.0045, lon: 76.9701 },
  { id: 'bin13', name: 'Tatabad (2)', lat: 11.0085, lon: 76.9754 },
  { id: 'bin14', name: 'Peelamedu (2)', lat: 11.0130, lon: 76.9500 },
  { id: 'bin15', name: 'Gandhipuram (2)', lat: 11.0071, lon: 76.9735 }
];

const map = L.map('map').setView([11.0168, 76.9558], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const markers = {};

bins.forEach(bin => {
  const marker = L.marker([bin.lat, bin.lon]).addTo(map)
    .bindPopup(`${bin.name}<br>Status: ${capitalize(binStatuses[bin.id])}`);
  markers[bin.id] = marker;
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderBinStatusUI() {
  const container = document.getElementById('bin-status-container');
  container.innerHTML = '';
  bins.forEach(bin => {
    const div = document.createElement('div');
    div.className = `bin-box ${binStatuses[bin.id]}`;
    div.id = bin.id;
    div.innerHTML = `${bin.name}<br><span>${capitalize(binStatuses[bin.id])}</span>`;
    container.appendChild(div);
  });
}

function updateAllBins() {
  for (let binId in binStatuses) {
    if (binStatuses[binId] === 'low') {
      binStatuses[binId] = 'medium';
    } else if (binStatuses[binId] === 'medium') {
      binStatuses[binId] = 'high';
    } else {
      binStatuses[binId] = 'low';
    }

    if (markers[binId]) {
      const bin = bins.find(b => b.id === binId);
      markers[binId].setPopupContent(`${bin.name}<br>Status: ${capitalize(binStatuses[binId])}`);
    }
  }

  renderBinStatusUI();
}

renderBinStatusUI();
