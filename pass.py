import os

# Target directory (use raw string `r""` to handle backslashes and spaces)
root_dir = r"C:\Users\fesas\OneDrive\Desktop\VISASTORE\visa-store\server"

# Extensions to include
allowed_extensions = {'.js', '.jsx', '.html', '.htm', '.css','.env'}

# Output file name
output_file = 'server  Folder.txt'

with open(output_file, 'w', encoding='utf-8') as out:
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            ext = os.path.splitext(filename)[1].lower()
            if ext in allowed_extensions:
                file_path = os.path.join(dirpath, filename)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        code = f.read()
                    out.write(f"=== {file_path} ===\n{code}\n\n")
                except Exception as e:
                    print(f"Could not read {file_path}: {e}")

print(f"✅ Done! Code saved in '{output_file}'")
