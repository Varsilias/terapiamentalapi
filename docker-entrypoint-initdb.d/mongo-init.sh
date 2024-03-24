# mongosh admin -u root -p Password1234 --eval "printjson(db.createUser({user: 'mainstack', pwd: 'Mainstack1234', roles: [{role: 'readWrite', db: 'mainstack'}]}))"
# mongosh admin -u root -p Password1234 --eval "printjson(db.createUser({user: 'mainstack', pwd: 'Mainstack1234', roles: [{role: 'readWrite', db: 'admin'}]}))"

# Define the path to the environment files
ENV_FILES="../.env ../.env.staging ../.env.test"

# Loop through each environment file and read the variables
for env_file in $ENV_FILES; do
    if [ -f "$env_file" ]; then
        source "$env_file"
    fi
done

# Replace the placeholders in the shell script with environment variables
script_content=$(cat <<EOF
mongosh admin -u "$DB_ROOT" -p "$DB_ROOT_PASSWORD" --eval "printjson(db.createUser({user: '$DB_USER', pwd: '$DB_PASSWORD', roles: [{role: 'readWrite', db: '$DB_NAME'}]}))"
EOF
)

# Execute the modified script
eval "$script_content"