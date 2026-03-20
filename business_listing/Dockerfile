FROM python:3.11-slim

WORKDIR /app

# Hugging Face Spaces run as user 1000. It's best practice to set up a non-root user.
RUN useradd -m -u 1000 user

# Set environment variables
ENV PATH="/home/user/.local/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    PORT=7860

# Copy requirements first for better layer caching
COPY --chown=user:user requirements.txt .

USER user

# Install dependencies
RUN pip install --no-cache-dir --user -r requirements.txt
# Force bcrypt 3.2.2 to prevent passlib incompatibility crashes
RUN pip install --no-cache-dir --user bcrypt==3.2.2

# Copy the rest of the application
COPY --chown=user:user . .

# Create the uploads directory and set permissions so the app can write to it
RUN mkdir -p uploads && chmod -R 777 uploads

# Create an empty SQLite DB file if you want to ensure it has correct permissions,
# or let SQLAlchemy create it if the folder is writable. We'll make /app writable for the SQLite DB.
USER root
RUN chmod 777 /app
USER user

# Expose the Hugging Face Spaces default port
EXPOSE 7860

# Run alembic migrations and then start the Uvicorn server
CMD ["sh", "-c", "alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port $PORT"]
