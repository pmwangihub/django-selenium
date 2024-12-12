from celery import Celery

app = Celery("src")

app.conf.broker_url = "redis://localhost:6379/0"
app.conf.result_backend = "redis://localhost:6379/0"

i = app.control.inspect()

active_tasks = i.active()
reserved_tasks = i.reserved()
scheduled_tasks = i.scheduled()


def revoke_tasks(tasks):
    for worker, task_list in tasks.items():
        for task in task_list:
            app.control.revoke(task["id"], terminate=True)
            print(f"\nRevoked task {task['id']} from worker {worker}\n")


if active_tasks:
    revoke_tasks(active_tasks)
if reserved_tasks:
    revoke_tasks(reserved_tasks)
if scheduled_tasks:
    revoke_tasks(scheduled_tasks)

print("All tasks have been revoked.")
