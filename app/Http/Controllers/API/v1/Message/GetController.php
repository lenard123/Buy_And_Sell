<?php

namespace App\Http\Controllers\API\v1\Message;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Model\Message;
use App\Model\User;

class GetController extends Controller
{

    public function index (Request $request)
    {
        $id = Auth::id();
        $messages = Message::select('from', 'to')
            ->where('from', $id)
            ->orWhere('to', $id)
            ->distinct()
            ->get();

        $x = collect([]);
        foreach ($messages as $message) {
            if ($message['from'] != $id && !$x->contains($message['from']))
                $x->push($message['from']);
            if ($message['to'] != $id && !$x->contains($message['to']))
                $x->push($message['to']);
        }

        $messages = collect([]);
        foreach ($x as $xid) {
            $message = [];
            $message['user'] = User::find($xid);
            $message['unread_message'] = Message::where([
                    ['from', $xid],
                    ['to', $id],
                    ['isread', 0]
                ])->get()->count();
            $messages->push($message);
        }

        return $messages->all();
    }

    public function user (Request $request, $id)
    {
        $your_id = Auth::id();

        $messages = Message::where([
            ['from', $your_id],
            ['to', $id]
        ])->orWhere([
            ['from', $id],
            ['to', $your_id]
        ])->orderBy('created_at', 'desc')
          ->limit(50)
          ->get();

        $messages = array_reverse($messages->all());

        Message::where([
            ['from', $id],
            ['to', $your_id],
            ['isread', 0]
        ])->update(['isread' => 1]);



        return $messages;
    }


}
