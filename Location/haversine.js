function haversine(curLatitude, curLongitude, userLatitude, userLongitude) {
    const radius = 6371; // Earth's radius in kilometers

    const dLat = (userLatitude - curLatitude) * Math.PI / 180;
    const dLon = (userLongitude - curLongitude) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(curLatitude * Math.PI / 180) * Math.cos(userLatitude * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = radius * c;
    return distance;
}

module.exports = haversine;