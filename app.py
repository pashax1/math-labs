from flask import Flask, render_template, request, jsonify
import time
import importlib
from calculations.benchmark_engine import compare_systems

app = Flask(__name__)

# ================= PAGE ROUTES =================

@app.route("/")
def home():
    return render_template("p1_home.html")

@app.route("/systems")
def systems():
    return render_template("p2_systems.html")

@app.route("/operations")
def operations():
    return render_template("p3_operations.html")

@app.route("/inputs")
def inputs():
    return render_template("p4_inputs.html")

@app.route("/calculation")
def calculation():
    return render_template("p5_calculation.html")

@app.route("/about")
def about():
    return render_template("p6_about_systems.html")

@app.route("/result")
def result():
    return render_template("p7_result.html")


# ================= API : BENCHMARK SPEED =================

@app.route("/api/compare", methods=["POST"])
def api_compare():
    data = request.get_json()

    system1 = data["system1"]
    system2 = data["system2"]
    operation = data["operation"]
    a = float(data["a"])
    b = float(data["b"])

    result = compare_systems(system1, system2, operation, a, b)

    return jsonify(result)   # ⭐ FIXED


# ================= API : LIVE CALCULATION STEPS =================

@app.route("/api/calculate", methods=["POST"])
def api_calculate():
    data = request.get_json()

    system1 = data["system1"]
    system2 = data["system2"]
    operation = data["operation"]
    inputs = data["inputs"]

    # dynamic import of engines
    eng1 = importlib.import_module(f"calculations.{system1}")
    eng2 = importlib.import_module(f"calculations.{system2}")

    func_name = f"{operation}"

    # run system 1
    start1 = time.perf_counter()
    result1, steps1 = getattr(eng1, func_name)(inputs)
    time1 = time.perf_counter() - start1

    # run system 2
    start2 = time.perf_counter()
    result2, steps2 = getattr(eng2, func_name)(inputs)
    time2 = time.perf_counter() - start2

    faster = system1 if time1 < time2 else system2
    diff = abs(time1 - time2) / max(time1, time2) * 100

    return jsonify({
        "steps1": steps1,
        "steps2": steps2,
        "result1": result1,
        "result2": result2,
        "time1": round(time1,6),
        "time2": round(time2,6),
        "faster": faster,
        "percent": round(diff,2)
    })


# ================= START SERVER =================
if __name__ == "__main__":
    app.run(debug=True)
