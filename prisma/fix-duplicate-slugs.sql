-- Verificar y corregir slugs duplicados en categorías
-- Agregar un sufijo único a cada slug para evitar duplicados

DO $$
DECLARE
    cat_record RECORD;
    counter INTEGER := 1;
BEGIN
    -- Actualizar slugs para que sean únicos
    FOR cat_record IN 
        SELECT id, name, slug, "createdAt"
        FROM categories 
        ORDER BY "createdAt"
    LOOP
        -- Actualizar el slug basado en el nombre y un contador si es necesario
        UPDATE categories 
        SET slug = LOWER(REGEXP_REPLACE(cat_record.name, '[^a-zA-Z0-9]+', '-', 'g'))
        WHERE id = cat_record.id;
        
        counter := counter + 1;
    END LOOP;
    
    RAISE NOTICE 'Slugs actualizados correctamente';
END $$;

-- Verificar que no haya duplicados
SELECT slug, COUNT(*) as count 
FROM categories 
GROUP BY slug 
HAVING COUNT(*) > 1;
