CREATE TABLE
    IF NOT EXISTS reminders (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        scheduled_at TIMESTAMPTZ NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );