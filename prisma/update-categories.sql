-- Actualizar categorías existentes con nombres relacionados a arte/cuadros
-- Asumiendo que hay al menos 7 categorías existentes

-- Obtener los IDs de las categorías existentes y actualizarlas
DO $$
DECLARE
    cat_ids text[];
    i integer;
BEGIN
    -- Obtener los IDs de las categorías existentes
    SELECT ARRAY_AGG(id ORDER BY "createdAt") INTO cat_ids FROM categories;
    
    -- Actualizar las primeras 7 categorías
    IF array_length(cat_ids, 1) >= 1 THEN
        UPDATE categories SET name = 'Realismo', slug = 'realismo', icon = 'Palette' WHERE id = cat_ids[1];
    END IF;
    
    IF array_length(cat_ids, 1) >= 2 THEN
        UPDATE categories SET name = 'Abstracto', slug = 'abstracto', icon = 'Sparkles' WHERE id = cat_ids[2];
    END IF;
    
    IF array_length(cat_ids, 1) >= 3 THEN
        UPDATE categories SET name = 'Impresionismo', slug = 'impresionismo', icon = 'Brush' WHERE id = cat_ids[3];
    END IF;
    
    IF array_length(cat_ids, 1) >= 4 THEN
        UPDATE categories SET name = 'Surrealismo', slug = 'surrealismo', icon = 'Eye' WHERE id = cat_ids[4];
    END IF;
    
    IF array_length(cat_ids, 1) >= 5 THEN
        UPDATE categories SET name = 'Minimalismo', slug = 'minimalismo', icon = 'Square' WHERE id = cat_ids[5];
    END IF;
    
    IF array_length(cat_ids, 1) >= 6 THEN
        UPDATE categories SET name = 'Paisajes', slug = 'paisajes', icon = 'Mountain' WHERE id = cat_ids[6];
    END IF;
    
    IF array_length(cat_ids, 1) >= 7 THEN
        UPDATE categories SET name = 'Retratos', slug = 'retratos', icon = 'User' WHERE id = cat_ids[7];
    END IF;
    
    RAISE NOTICE 'Categorías actualizadas exitosamente';
END $$;
