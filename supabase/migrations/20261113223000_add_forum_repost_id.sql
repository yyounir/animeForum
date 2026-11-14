ALTER TABLE public."Forum"
ADD COLUMN repost_id bigint REFERENCES public."Forum"(id) ON DELETE SET NULL;
