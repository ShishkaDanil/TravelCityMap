function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export function getDistant(lat1, lon1, lat2, lon2) {
  // Радиус Земли в километрах
  const earthRadius = 6371;

  // Переводим градусы в радианы
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  // Рассчитываем haversin
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

  // Вычисляем угловое расстояние в радианах
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Рассчитываем фактическое расстояние
  const distance = earthRadius * c;

  return distance;
}