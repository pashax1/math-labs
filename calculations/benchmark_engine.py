# calculations/benchmark_engine.py

import time

# import all system engines
from calculations import arabic
from calculations import babylonian
from calculations import roman
from calculations import vedic
from calculations import egyptian
from calculations import greek
from calculations import chinese
from calculations import modern


# map system names to modules
SYSTEMS = {
    "arabic": arabic,
    "babylonian": babylonian,
    "roman": roman,
    "vedic": vedic,
    "egyptian": egyptian,
    "greek": greek,
    "chinese": chinese,
    "modern": modern
}

ITERATIONS = 2000   # repeat operations to measure real time


def run_operation(module, operation, a, b):
    """
    Calls the correct function inside each system file
    Every system file must implement same function names.
    """

    if operation == "add":
        return module.add(a, b)

    if operation == "sub":
        return module.sub(a, b)

    if operation == "mul":
        return module.mul(a, b)

    if operation == "div":
        return module.div(a, b)

    if operation == "power":
        return module.power(a, b)

    raise Exception("Operation not supported yet")


def measure_time(system_name, operation, a, b):
    """Run same operation many times to get real CPU time"""
    module = SYSTEMS[system_name]

    start = time.perf_counter()

    for _ in range(ITERATIONS):
        run_operation(module, operation, a, b)

    end = time.perf_counter()
    return end - start


def compare_systems(system1, system2, operation, a, b):
    """Main function used by Flask"""

    t1 = measure_time(system1, operation, a, b)
    t2 = measure_time(system2, operation, a, b)

    faster = system1 if t1 < t2 else system2
    diff = abs(t1 - t2)
    percent = (diff / max(t1, t2)) * 100

    return {
        "system1_time": round(t1, 5),
        "system2_time": round(t2, 5),
        "faster": faster,
        "percent": round(percent, 2)
    }
