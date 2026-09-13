-- 1. Insertar Categorías con sus respectivos íconos
INSERT INTO categories (id, name, icon_url) VALUES
(1, 'Cafés y Negocios', '/icons/cafe.svg'),
(2, 'Juegos y Recreación', '/icons/family.svg'),
(3, 'Naturaleza y Aventura', '/icons/adventure.svg'),
(4, 'Puntos Históricos y Secretos', '/icons/history.svg'),
(5, 'Atracciones Principales', '/icons/adventure.svg');

-- 2. Insertar Localidades (San Clemente y Las Toninas como ejemplo piloto)
INSERT INTO localities (id, name, slug, skin_image_url, latitude_center, longitude_center) VALUES
(1, 'San Clemente del Tuyú', 'san-clemente', '/maps/san-clemente.svg', -36.353300, -56.678300),
(2, 'Las Toninas', 'las-toninas', '/maps/las-toninas.svg', -36.452100, -56.676600);

-- 3. Insertar Puntos de Interés para San Clemente del Tuyú (locality_id = 1)
INSERT INTO places (locality_id, category_id, title, description, latitude, longitude, is_premium, is_free, opening_hours) VALUES
(
  1, 5, 
  'Mundo Marino', 
  'El oceanario más grande de Sudamérica. Disfrutá de los shows educativos con animales marinos y experiencias únicas.', 
  -36.331400, -56.717500, 
  FALSE, FALSE, 
  '10:00 - 18:00'
),
(
  1, 4, 
  'Punta Raza', 
  'El punto mágico donde se une el inmenso Río de la Plata con el Mar Argentino. Ideal para avistaje de aves y atardeceres únicos.', 
  -36.305000, -56.772500, 
  FALSE, TRUE, 
  'Abierto 24hs'
),
(
  1, 3, 
  'Vivero Municipal Cosme Argerich', 
  'Un impresionante pulmón verde de 40 hectáreas con senderos de árboles centenarios, zonas de picnic y descanso.', 
  -36.345000, -56.702000, 
  FALSE, TRUE, 
  '08:00 - 20:00'
),
(
  1, 4, 
  'Plaza del Reloj', 
  'El corazón céntrico de la ciudad, famoso por su emblemático reloj floral y punto de encuentro clásico.', 
  -36.356200, -56.711200, 
  FALSE, TRUE, 
  'Abierto 24hs'
),
(
  1, 4, 
  'La Tapera de López', 
  'Sitio histórico a orillas del ría, ligado a los orígenes fundacionales de la zona y excelentes vistas panorámicas.', 
  -36.368000, -56.695000, 
  FALSE, TRUE, 
  'Abierto 24hs'
);

-- 4. Insertar Puntos de Interés para Las Toninas (locality_id = 2)
INSERT INTO places (locality_id, category_id, title, description, latitude, longitude, is_premium, is_free, opening_hours) VALUES
(
  2, 2, 
  'Laberinto de Las Toninas', 
  'Un clásico indiscutido para perderse y divertirse en familia dentro de un predio boscoso encantador frente al mar.', 
  -36.453000, -56.681000, 
  FALSE, FALSE, 
  '11:00 - 19:00'
),
(
  2, 4, 
  'Monumento al Sembrador', 
  'Monumento histórico emblemático que rinde homenaje a los pioneros y fundadores de la localidad.', 
  -36.450500, -56.675000, 
  FALSE, TRUE, 
  'Abierto 24hs'
);