import sys
import subprocess
import time
from functools import lru_cache

@lru_cache(maxsize=128)
def generate_response(name, date, category, timeout=10):
    start_time = time.time()
    try:
        prompt = f"Generate a certificate content for {name}, who completed a {category} course on {date}. Please keep the content as short as possible."
        process = subprocess.Popen(
            ['ollama', 'run', 'llama3.2', prompt],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        output = []
        while True:
            # Break if timeout exceeded
            if time.time() - start_time > timeout:
                process.kill()
                return "Process timed out"

            line = process.stdout.readline()
            if not line and process.poll() is not None:
                break
            if line:
                print(line.strip())  # Print for real-time feedback
                output.append(line.strip())
                sys.stdout.flush()

        process.wait()
        elapsed_time = time.time() - start_time
        print(f"Response generated in {elapsed_time:.2f} seconds")
        return "\n".join(output)

    except subprocess.TimeoutExpired:
        process.kill()
        return "Process timed out"
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return str(e)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python generate_response.py <name> <date> <category>")
        sys.exit(1)
    result = generate_response(sys.argv[1], sys.argv[2], sys.argv[3], timeout=10)
    print(result)
