<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Project;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,

            'title' => $this->title,
            'description' => $this->description,
            'attachment_urls' => $this->getAttachments(),

            'project_id' => $this->project_id,
            'project_title' => Project::find($this->project_id)->title,

            'parent_task_id' => $this->parent_task_id,
            'priority_id' => $this->priority_id,
            'priority_text' => $this->getPriorityTextAttribute(),

            'status_id' => $this->status_id,
            'status_text' => $this->getStatusTextAttribute(),

            'estimated_proficiency' => $this->estimated_proficiency,
            'proficiency' => $this->proficiency,

            'estimated_time' => $this->estimated_time,
            'start_at' => $this->start_at,
            'end_at' => $this->end_at,
            'deadline' => $this->deadline,

            'score' => $this->score,

            'task_members' => $this->getMembers(false),
            'task_observers' => $this->getObservers(false),

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

        ];
    }
}
