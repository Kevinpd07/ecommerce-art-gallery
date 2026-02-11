-- Actualizar artistas existentes con nombres de artistas reales famosos
DO $$
DECLARE
    artist_ids text[];
    i integer;
BEGIN
    -- Obtener los IDs de los artistas existentes
    SELECT ARRAY_AGG(id ORDER BY "createdAt") INTO artist_ids FROM artists;
    
    -- Actualizar los primeros artistas con nombres de artistas famosos
    IF array_length(artist_ids, 1) >= 1 THEN
        UPDATE artists SET name = 'Pablo Picasso', slug = 'pablo-picasso' WHERE id = artist_ids[1];
    END IF;
    
    IF array_length(artist_ids, 1) >= 2 THEN
        UPDATE artists SET name = 'Vincent van Gogh', slug = 'vincent-van-gogh' WHERE id = artist_ids[2];
    END IF;
    
    IF array_length(artist_ids, 1) >= 3 THEN
        UPDATE artists SET name = 'Leonardo da Vinci', slug = 'leonardo-da-vinci' WHERE id = artist_ids[3];
    END IF;
    
    IF array_length(artist_ids, 1) >= 4 THEN
        UPDATE artists SET name = 'Claude Monet', slug = 'claude-monet' WHERE id = artist_ids[4];
    END IF;
    
    IF array_length(artist_ids, 1) >= 5 THEN
        UPDATE artists SET name = 'Salvador Dalí', slug = 'salvador-dali' WHERE id = artist_ids[5];
    END IF;
    
    IF array_length(artist_ids, 1) >= 6 THEN
        UPDATE artists SET name = 'Frida Kahlo', slug = 'frida-kahlo' WHERE id = artist_ids[6];
    END IF;
    
    IF array_length(artist_ids, 1) >= 7 THEN
        UPDATE artists SET name = 'Rembrandt van Rijn', slug = 'rembrandt-van-rijn' WHERE id = artist_ids[7];
    END IF;
    
    IF array_length(artist_ids, 1) >= 8 THEN
        UPDATE artists SET name = 'Michelangelo', slug = 'michelangelo' WHERE id = artist_ids[8];
    END IF;
    
    IF array_length(artist_ids, 1) >= 9 THEN
        UPDATE artists SET name = 'Diego Velázquez', slug = 'diego-velazquez' WHERE id = artist_ids[9];
    END IF;
    
    IF array_length(artist_ids, 1) >= 10 THEN
        UPDATE artists SET name = 'Johannes Vermeer', slug = 'johannes-vermeer' WHERE id = artist_ids[10];
    END IF;
    
    IF array_length(artist_ids, 1) >= 11 THEN
        UPDATE artists SET name = 'Edvard Munch', slug = 'edvard-munch' WHERE id = artist_ids[11];
    END IF;
    
    IF array_length(artist_ids, 1) >= 12 THEN
        UPDATE artists SET name = 'Gustav Klimt', slug = 'gustav-klimt' WHERE id = artist_ids[12];
    END IF;
    
    IF array_length(artist_ids, 1) >= 13 THEN
        UPDATE artists SET name = 'Artista Desconocido', slug = 'artista-desconocido' WHERE id = artist_ids[13];
    END IF;
    
    RAISE NOTICE 'Artistas actualizados exitosamente';
END $$;
