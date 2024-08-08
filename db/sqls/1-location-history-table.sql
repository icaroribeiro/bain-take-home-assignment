CREATE TABLE IF NOT EXISTS location_history (
    id uuid NOT NULL,
    source_address text NOT NULL,
    destination_address text NOT NULL,
    distance numeric NOT NULL,
    created_at timestamp with time zone NOT NULL,
    CONSTRAINT location_history_pkey PRIMARY KEY (id)
);
